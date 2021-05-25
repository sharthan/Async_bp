// Prerequisits. https://www.npmjs.com/package/http-server
// Then run form folder dir: http-server
var currentLeverValues = []
//Add the token id for all the token layers here. 768 is just an example layer added by me.
var tokenID = $("#inputToken").val()

//Connect to the Ethereum network with MetaMask or Infura
const provider = new ethers.providers.Web3Provider(window.ethereum)
//   const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/XXXXXXXXXXXXXXXXXXXXXXXX"

var signer = provider.getSigner();
var asyncAddress = "0x4F37310372dd39d451f7022EE587FA8B9F72d80B"
var asyncContract
var ownerOfToken = []
var controlToken
var layer
var contractWithSigner

function inputUpdate() {
  tokenID = $("#inputToken").val()
}

// connects to eth network
function connect() {
  //Will Start the metamask extension
  ethereum.request({
    method: 'eth_requestAccounts'
  });
  //Checks if the user is connected to the ETH network.
  if (ethereum.isConnected()) {
    checkNettwork()
    console.log("Is connectd to MM: " + ethereum.isMetaMask)
  } else {
    console.log("You are not connected to ETH network")
  }
  asyncContract = new ethers.Contract(asyncAddress, asyncAbi, provider);
  contractWithSigner = asyncContract.connect(signer)
};



//Checks which network you are connected to. 1 is main net and 4 is Rinkeby
function checkNettwork() {
  if (ethereum.networkVersion == 4) {
    //Async Contract on Rinkeby: 0x4F37310372dd39d451f7022EE587FA8B9F72d80B
    asyncAddress = "0x4F37310372dd39d451f7022EE587FA8B9F72d80B"
    $("#nettwork").text("You are connected to the Rinkeby test network")
  } else if (ethereum.networkVersion == 1) {
    //Async Contract on Mainnet: 0xb6dae651468e9593e4581705a09c10a76ac1e0c8
    asyncAddress = "0xb6dae651468e9593e4581705a09c10a76ac1e0c8"
    $("#nettwork").text("You are connected to the Main network")
  } else {
    asyncAddress = ""
    $("#nettwork").text("Please connect to the Mainet or the Rinkeby test nettwork")
  }
}

var currentLeverValuesAll = []
var allMin = []
var allMax = []
var allLayerValues = []

//Connects to the layers and get the position of all tha pieces
async function getState() {
  controlToken = []
  controlToken = await asyncContract.getControlToken(tokenID);
  //Clear content
  currentLeverValues = []
  allMin = []
  allMax = []
  allLayerValues = []

  for (var i = 0; i < controlToken.length; i++) {
    //Creates an array with all the values form the layer
    allLayerValues.push(controlToken[i].toString())
    if (i % 3 == 2) { // every 3rd value is a current lever setting [min, max, current, min, max, current]
      currentLeverValues.push(controlToken[i].toString())
    }
    if (i % 3 == 0) { // Min values for layers
      allMin.push(controlToken[i].toString())
    }
    if (i % 3 == 1) { // max values for layers
      allMax.push(controlToken[i].toString())
    }
  }
  //Showes lever values
  $("#status").text("This is all the raw layer values [min, max, current,...]: \n " + allLayerValues)
  addChoices()
}

//Get the Eth address from all the token holders of layers
async function owner() {
  ownerOfToken = await asyncContract.ownerOf(tokenID)
  //Showes wallet address of token owner.
  $("#status").text(ownerOfToken)
}



// This wil update the token layer. This only works if a new walue is passed to the "newValue". The same value wil fail.
async function update() {
  //Check if logged in account own this layer.
  //To upper case because of the address might contain smaland big caps.
  if (ownerOfToken.toUpperCase() == ethereum.selectedAddress.toUpperCase()) {
    layer = $("#inputToken").val()
    layerPosition = []
    newValue = []

    for (var i = 0; i < currentLeverValues.length; i++) {
      //If new value is not the same as the old value. update this.
      if (currentLeverValues[i] != $("#selectVal" + i).val()) {
        layerPosition.push(i)
        newValue.push($("#selectVal" + i).val())
      }
    }

    //Detect if no changes are done.
    if (newValue.length !== 0) {
      if (newValue != currentLeverValues) {
        // Send update layer
        txChangeToken = await contractWithSigner.useControlToken(parseInt(layer), [parseInt(layerPosition)], [parseInt(newValue)])
        //Checks to see if block is mined to the BC
        txChangeToken.wait(1).then(function(value, error) {
          if (value.confirmations > 0) {
            console.log("Change made to token " + tokenID[layer])
            getState()
          } else {
            //No change made
            console.log("Error on change")
            getState()
          }
        });
        console.log(txChangeToken)

      }
    } else {
      console.log("You are trying to update the layer to it´s current state, no update needed.")
    }
  } else {
    console.log("You do not own this token")
  }
}


function setToCurrent() {
  for (var i = 0; i < currentLeverValues.length; i++) {
    $("#selectVal" + i).val(currentLeverValues[i])
  }
}

// Adds new dropdowns.
function addChoices() {
  //Clear out previous content.
  $("#layerUpdate").html("")

  var overview = $('<div class="grid-item">' + "Min: " + '</div>' +
    '<div class="grid-item">' + "Max: " + '</div>' +
    '<div class="grid-item">' + "Current/Select" + '</div>');

  $("#layerUpdate").append(overview)

  //Creates the slector and loades the content based on tha layer choices aviable
  for (var i = 0; i < currentLeverValues.length; i++) {
    var select = $('<select>').prop("id", "selectVal" + i)
    //.prop("name", "Select value" + i);

    for (var j = allMin[i]; j <= allMax[i]; j++) {
      select.append($("<option>")
        .prop("value", j)
        .text(j))
    }

    var grid = $(
      '<div class="grid-item">' + allMin[i] + '</div>' +
      '<div class="grid-item">' + allMax[i] + '</div>');

    $("#layerUpdate").append(grid).append(select)
  }
  //Set the dropdown to current value
  setToCurrent()
  $("#clean").text("The raw layer values can be organized and presented like this: ")

}

// Force page refreshes on network changes
{
  // The "any" network will allow spontaneous network changes
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  provider.on("network", (newNetwork, oldNetwork) => {
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network
    if (oldNetwork) {
      window.location.reload();
    }
  });
}
