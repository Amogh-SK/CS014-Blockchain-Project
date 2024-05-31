// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentMarks {
    struct Student {
        string name;
        uint[] marks;
        bytes32 merkleRoot;
        uint timestamp;
    }

    mapping(uint => Student) public students;
    uint public studentCount;

    // Event to log the addition of a new student
    event StudentAdded(uint indexed studentId, string name, uint[] marks, bytes32 merkleRoot, uint timestamp);

    function addStudent(string memory _name, uint[] memory _marks) public {
        require(_marks.length > 0, "At least one mark should be provided");

        // Calculate Merkle root from marks
        bytes32 merkleRoot = calculateMerkleRoot(_marks);

        // Add student to mapping
        studentCount++;
        students[studentCount] = Student(_name, _marks, merkleRoot, block.timestamp);

        // Emit event
        emit StudentAdded(studentCount, _name, _marks, merkleRoot, block.timestamp);
    }

    // Function to calculate Merkle root from marks
    function calculateMerkleRoot(uint[] memory _marks) internal pure returns (bytes32) {
        bytes32[] memory hashes = new bytes32[](_marks.length);
        for (uint i = 0; i < _marks.length; i++) {
            hashes[i] = keccak256(abi.encodePacked(_marks[i]));
        }
        return calculateRootHash(hashes);
    }

    // Function to calculate root hash from leaf node hashes
    function calculateRootHash(bytes32[] memory hashes) internal pure returns (bytes32) {
        while (hashes.length > 1) {
            uint length = hashes.length;
            for (uint i = 0; i < length / 2; i++) {
                hashes[i] = keccak256(abi.encodePacked(hashes[2 * i], hashes[2 * i + 1]));
            }
            if (length % 2 != 0) {
                hashes[length / 2] = hashes[length - 1];
            }
            assembly {
                mstore(hashes, div(length, 2))
            }
        }
        return hashes[0];
    }
}
