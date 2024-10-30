const express = require("express");
const pug = require("pug");
const path = require("path");
const morgan = require("morgan")

const app = express();
const port = 3000;


//use third pary middleware(morgan) for HTTP request logging
app.use(morgan('combined'));


//this serves as static files from the styles directory
app.use(express.static(path.join(__dirname, "styles")));
//this serves as static files from the image directory
app.use(express.static(path.join(__dirname, "Images")));





 //set the views directory
app.set("views",path.join(__dirname, "views"));
//set pug as the view engine
app.set("view engine", "pug"); 

app.get("/", (req, res) =>{
    console.log("Received a request for the home page.");
    const options ={
        title: "Rendering my Salvation Story with Pug-view Engine",
        content:
     `  " Love so perfect, Love Divine! Our Jesus Perfected all that concerns me..\
       So I am perfect In this journey of faith, I reflect on the profound love that surrounds me—a love that is not only perfect but also divine.\
       As I explore the depths of this love, I find that it has transformed every aspect of my life.
       The words "Love so perfect, Love Divine!" resonate deeply within my soul, reminding me of the grace that flows from my Savior, Jesus Christ.\
       Through His sacrifice, Jesus perfected everything that concerns me. He took my struggles, fears, and imperfections and transformed them into something beautiful. 
       This realization fills me with hope and joy, for I am no longer defined by my shortcomings. Instead, I stand in the assurance that I am made perfect through His love.
       As I render this salvation story using the Pug view engine, I aim to capture the essence of this transformation.
       Each line of code and every rendered view will serve as a testament to the journey I’ve taken—a journey from brokenness to wholeness, from despair to joy.\
       In this narrative, I seek to illustrate how divine love has shaped my identity, allowing me to embrace the truth that I am perfect in His eyes. With each rendered page,\
       I celebrate the beauty of this salvation story, sharing not just my past but the ongoing story of hope and redemption that continues to unfold."`
    };


    res.render("index", options);
});

//handle the download route
app.get("/download", (req, res) =>{
    const filePath = path.join(__dirname, "Images", "my-img.png");
    res.download(filePath, "my-img.png", (err) =>{
        if (err){
            console.error("Error downloading file:", err);
            res.status(500).send("Could not download the file.");
        }
    })
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});
