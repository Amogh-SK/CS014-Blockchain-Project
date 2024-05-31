window.addEventListener('load', async () => {
    // Connect to Ganache via HTTP provider
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545'); // Update the port if your Ganache is running on a different port

    // Initialize Web3 with the HTTP provider
    window.web3 = new Web3(provider);

    // Contract ABI
    const abi = [
        {
            "inputs": [],
            "name": "studentCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "students",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256[]",
                    "name": "marks",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bytes32",
                    "name": "merkleRoot",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_marks",
                    "type": "uint256[]"
                }
            ],
            "name": "addStudent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    // Contract Address
    const address = '0xf78981fE432cF36CeC473a9a1a500061603ABE12'; // Update with your contract address
    // Initialize the contract
    const contract = new web3.eth.Contract(abi, address);

    const addStudentForm = document.getElementById('addStudentForm');
    const status = document.getElementById('status');

    addStudentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentName = e.target.elements.studentName.value;
        const mark1 = parseInt(e.target.elements.mark1.value);
        const mark2 = parseInt(e.target.elements.mark2.value);
        const mark3 = parseInt(e.target.elements.mark3.value);
        const mark4 = parseInt(e.target.elements.mark4.value);
        const marks = [mark1, mark2, mark3, mark4];

        try {
            // Call the addStudent function from your contract
            const accounts = await web3.eth.getAccounts();
            const tx = await contract.methods.addStudent(studentName, marks).send({ from: accounts[0], gas: 6000000 }); // Increase gas limit
            status.textContent = `Marks entered successfully! Transaction Hash: ${tx.transactionHash}`;
            console.log("Transaction Hash:", tx.transactionHash);
        } catch (error) {
            status.textContent = `Error: ${error.message}`;
            console.error("Error:", error);
        }
    });
});
