window.ethereum.enable();
var provider = new ethers.providers.Web3Provider(web3.currentProvider,"rinkeby");
var MoodContractAddress="0x649200F7004648Dc23f28323AB3A020456112164";
var MoodContractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
var MoodContract
var signer

provider.listAccounts().then(function(accounts){
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(MoodContractAddress,MoodContractABI,signer);
})

async function setMood(){
    let mood = document.getElementById("moods").value;
    setMoodPromise =  MoodContract.setMood(mood);
    await setMoodPromise
}

async function getMood(){
    getMoodPromise = MoodContract.getMood();
    let playlist = await getMoodPromise
    console.log(playlist.toString());
    getPlaylist(playlist);
}

function getPlaylist(plink) {
    document.getElementById("link").style.display = "flex";
    let result = "<a href='" + plink + "' target='_blank'> Your Playlist is Here!</a>";
    document.getElementById("link").innerHTML = result;
}