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
const { order, products } = require("../../models/");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ordersArr = yield order.findAll();
    return res.json({ ordersArr });
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, qty, total_price, delivery_option } = req.body;
    try {
        const orderSummary = yield order.create({
            product_name,
            qty,
            total_price,
            delivery_option,
        });
        return res.json(orderSummary);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "something went wrong!!" });
    }
}));
router.delete("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const orderSummary = yield order.findOne({ where: { id } });
            yield orderSummary.destroy();
            return res.json(orderSummary);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "something went wrong!!" });
        }
    });
});
router.delete("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            order.destroy({
                where: {},
                truncate: true,
            });
            return res.json({ msg: "clear" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "something went wrong" });
        }
    });
});
module.exports = router;
