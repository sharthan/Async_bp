# Async boilerplate

This webpage boilerplate has to be served by a server to be able to work.


## How to install:

How to set this up with Node.js:

1) First, you need to have npm installed on your computer:
This comes with Node.js head over there:
https://nodejs.org/en/ and download the latest version. 

2) Go to the folder where you downloaded the files and run in  command line(Win) or terminal(MAC)

`npm install http-server`

3) Then run in command line/terminal:

`HTTP-server`

4) Copy and paste one of the addresses to your browser where you write in the URL ( e.g., 192.128.55.8080:3001).
5) Click on the "indexbp.html" link

You will now be able to access the server-delivered version of this boilerplate. 




## How to use:


This page lets you log onto it with MetaMask.
Then it lets you insert the layer token ID. There has been added one placeholder layer id for testing.
By connecting to Metamask and clicking the different buttons,  you can see who owns the layer(their eth address) and the layer value(the state selected of the layer).


### How to get the layer token id:
Go to the async layer you want to interact with. 
E.g., https://async.art/art/layer/0xb6dae651468e9593e4581705a09c10a76ac1e0c8-1454
Click on the text under where it said when it was created. You will get sent to an ether scan page. 
E.g.https://etherscan.io/tx/0x13c43550b4b063b5aaf5b1189f626b75751b4db0ccc9259aa10b9b63ebb1d3c1

In the end, on the left side, click on: "Click to see more."
Then click on the "Decode input date button."
There you can see the controlTokenId.
E.g. 0	controlTokenId	uint256	1454
Data number  1454 is the token control Id you will need to access this token from the boilerplate. 


### Using this boilerplate with Infura for a user that does not have MetaMask.

How to connect with, e.g., Infura instead of MetaMask.
At line 44 in index_bp.html:   
`const provider = new ethers.providers.Web3Provider(window.ethereum)`

Replace it with.
`const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/XXXXXXXXXXXXXXXXXXXXXXXX")`

Where XXXXXX is your code, you get from the Eth settings page in Infura after creating a project there.

Rinkeby is the test network we use for creating Async test layers.
Contact the Async team on discord to get Access to their testnet layers
