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
const { price, products } = require("../../models/");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pricesArr = yield price.findAll();
        let productsName = [];
        for (let item of pricesArr) {
            const product_id = item.product_id;
            const product = yield products.findOne({ where: { product_id } });
            if (product) {
                productsName.push(product.name);
            }
        }
        return res.json({
            names: productsName,
            prices: pricesArr,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong!!" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, prev_price, curr_price } = req.body;
    try {
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
        return res.json(productTracked);
    }
    catch (err) {
        console.log(err);
        return res.json({ error: "something went wrong!!" });
    }
}));
router.delete("/:product_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    try {
        const productTracked = yield price.findOne({ where: { product_id } });
        if (productTracked != null) {
            yield productTracked.destroy();
        }
        return res.json("deleted");
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong!!" });
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        price.destroy({
            where: {},
            truncate: true,
        });
        return res.json("cleard");
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong!!" });
    }
}));
module.exports = router;
