import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validator: value => value.trim() !== "",
    message: ({path}) => `O campo ${path} está em branco! Por favor preencha-o!`
});

