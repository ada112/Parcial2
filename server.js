var express = require("express");
var expbhs = require("express-handlebars")

var app = express();
app.engine("handlebars", expbhs({
    defaultLayout: "index", helpers: {
        math: function (lvalue, operator, rvalue) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        }
    }
}))

app.set("view engine", "handlebars")


var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {

    res.send("You are on the homepage");
});

app.post("/post", function(req, res){
    var respuesta = req.body;

    res.send("Welcome " + respuesta.user);
});

app.delete("/delete", function(req, res){
    res.send({delete: true})
});

app.put("/put/:id", function(req, res){
    var respuesta = req.params.id;

    res.send("Task "+respuesta+ " has been updated");

});

app.listen(PORT, () => {
    console.log(PORT);
});