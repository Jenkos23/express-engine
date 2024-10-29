const express = require("express");
const app = express();
const port = 3000;



//this serves as static files from the styles directory
app.use(express.static("./styles"));

//require the pug module
const pug = require('pug');

//define the template engine using pug
app.engine("pug", (filepath, options, callback) =>{
    pug.compileFile(filepath, (err, compiledFunction) =>{
        if (err){
            console.error('Error compling Pug template:', err);
            return callback(err);
        } 


 // Render the Pug template using the provided options
    const rendered = compiledFunction(options);
    return callback(null, rendered);
    //   .toString()
    //   .replaceAll("#title#", `${options.title}`)
    //   .replace("#content#", `${options.content}`);
    // return callback(null, rendered);
    
    });
});
 //set the views directory
app.set("views", "./views");
//set pug as the view engine
app.set("view engine", "pug"); 

app.get("/", (req, res) =>{
    console.log("Received a request for the home page.");
    const options ={
        title: "Rendering my Salvation Story with Pug-view Engine",
        content:
        "Love so perfect, Love Divine! "
    };


    res.render("index", options);
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`)
})
