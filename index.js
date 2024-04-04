import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express()
const port = 3000;
let jokeCalled = false;
let setup;
let delivery;
let joke;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.listen(port, () => {
    console.log('listening on port ' + port);
})

app.get("/", async (req,res)=>{
    try{

    console.log(response);
    } catch(error){
        console.error(error);
    }
    res.render("index.ejs", {jokeCalled, joke, setup, delivery});
})

app.get("/getJoke", async(req, res)=>{

    // const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags="+req.query.choice;
    const url = "https://v2.jokeapi.dev/joke/Any";


    try{
        const response = await axios.get(url);
        joke = "";
        setup= "";
        delivery = "";
        jokeCalled = true;
        
        console.log("akwasi response" + response.data.type);
        // console.log(response )
        if(response.data.type == "twopart"){
            console.log("this is the setup" + response.data.setup );
            console.log("this is the delivery" + response.data.delivery);
            setup = response.data.setup;
            delivery = response.data.delivery;
            res.render("index.ejs", {jokeCalled, setup, delivery, joke});

        }
        else{
            joke = response.data.joke;
            res.render("index.ejs",{jokeCalled, joke, setup, delivery });
            

        }

        } catch(error){
            console.error(error);
        }

});