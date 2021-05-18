# Async boilerplate

This webpage boilerplate has to be served by a server to be able to work.


## How to install:

How to set this up with Node.js:

1) First you need to have npm installed on your computer:
This comes with Node.js head over there:
https://nodejs.org/en/ and downloade the latest version. 

2) Go to the folder where you downloades the files and run in  commandline(Win) or terminal(MAC)

`npm install http-server`

3) Then run in commandline/terminal:

`http-server`

4) Copy and past one of the addresses to you browser where you write in the url ( e.g. 192.128.55.8080:3001).

You will now be able to access the server dellivered version of this boiler plate. 




## How to use:


This page lets you log onto it with MetaMask
Then it let you insert the layer token ID. There has been added one placeholder layer id for testing.
By connecting to Metamask and clicking the different buttons,  you can see who owns the layer(their eth address), and the layer value(what state that is selected of the layer).


### How to get the layer token id:
Go to the async layer you want to interact with. 
E.g. https://async.art/art/layer/0xb6dae651468e9593e4581705a09c10a76ac1e0c8-1454
Click on the text under where it says when it was created. You will get sendt to a ether scan page. 
E.g.https://etherscan.io/tx/0x13c43550b4b063b5aaf5b1189f626b75751b4db0ccc9259aa10b9b63ebb1d3c1

At the end on the left side click on: "Click to se more"
Then click on "Decode imputdate button"
There you can see the controlTokenId.
E.g. 0	controlTokenId	uint256	1454
The Data number  1454 is the controll token Id you will need to use to access this token from the boilder plate. 


### Using this boilerplate with infura for user that does not have MetaMask.

How to connect with e.g. Infura insted of MetaMask.
At line 36 in the boiler plater:   const provider = new ethers.providers.Web3Provider(window.ethereum)

Replace it with. 
  const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/XXXXXXXXXXXXXXXXXXXXXXXX")

Where XXXXXX is your code you get from the Eth settings page in Infura after having created a project there.
Rinkeby is the test network we use for creating Async test layers.
