# Async_bp
Boilerplate

Please use it only on Rinkeby test net when playing around for security reasosn.


This webpage boilerplate has to be served by a server to be able to work.

**********************************************************************************************
How to install:
**********************************************************************************************
How to set this up with Node.js:

1) First you need to have npm installed on your computer:
This comes with Node.js head over there:
https://nodejs.org/en/ and downloade the latest version. 

2) Go to the folder where you downloades the files and run in  commandline(Win) or terminal(MAC)

npm install http-server

Then run in commandline/terminal:

http-server

Copy and past one of the addresses to you browser(Where you write in the url)

You will now be able to access the server dellivered version of this boiler plate. 




**********************************************************************************************
How to use:
**********************************************************************************************

This page lets you log onto it with Meta Mask
Then it let you insert the layer token ID. I have added one placeholder for testing.
Then you can see who owns it, And the layer value(what state that is selected of the layer).





How to connect with e.g. Infura insted of MetaMask.
At line 36 in the boiler plater:   const provider = new ethers.providers.Web3Provider(window.ethereum)

Replace it with. 
  const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/XXXXXXXXXXXXXXXXXXXXXXXX")

Where XXXXXX is your code you get from the Eth settings page in Infura after having created a project there.
Rinkeby is the test network we use for creating Async test layers.
