"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { Router } = require("express");
const express_1 = require("express");
const socket_io_1 = require("../socket-io");
const { products, price } = require("../../models/");
const router = (0, express_1.Router)();
router.put("/update_price", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, new_price } = req.body;
    try {
        // update product and emit event
        const productToUpdate = yield products.findOne({ where: { product_id } });
        productToUpdate.prev_price = productToUpdate.curr_price;
        productToUpdate.curr_price = parseFloat(new_price);
        yield productToUpdate.save();
        socket_io_1.SocketIo.emitUpdatePrice();
        // update price tracking
        const prev_price = productToUpdate.prev_price;
        const curr_price = productToUpdate.curr_price;
        let productTracked = yield price.findOne({ where: { product_id } });
        if (productTracked === null) {
            let prices = [prev_price, curr_price];
            let dates = [new Date()];
            productTracked = yield price.create({ product_id, prices, dates });
        }
        else {
            let prices = [...productTracked.prices];
            prices.push(curr_price);
            productTracked.prices = prices;
            let dates = [...productTracked.dates];
            dates.push(new Date());
            productTracked.dates = dates;
            yield productTracked.save();
        }
        return res.json(productToUpdate);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
    }
}));
module.exports = router;
