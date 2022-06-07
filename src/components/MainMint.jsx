import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { ethers, BigNumber } from 'ethers'
import { useState } from 'react'
import roboPunksNFT from '../RoboPunksNFT.json'

const roboPunksNFTAddress = '0x8944ea945Fa05C969124DD12fca140CAa75d4147'

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1)
  const isConnected = Boolean(accounts[0])

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      )
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        })
        console.log('response', response)
      } catch (err) {
        console.error("error: ", err)
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return
    setMintAmount(mintAmount - 1)
  }

  const handleIncrement = () => {
    if (mintAmount >= 3) return
    setMintAmount(mintAmount + 1)
  }

  return (
    <Flex justifyContent="center" align="center" height="100vh" pb="150px">
      <Box w="520px">  
      <div>
        <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
        <Text fontSize="30px" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px 2px #000000">It's 2078. Can the RoboPunks NFT save humans from destructive rampant NFT speculation? Mint RoboPunks to find out.</Text>
      </div>
        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button 
                onClick={handleDecrement} 
                backgroundColor="#d6517d"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                p="15px"
                mt="10px"
              >
                -
              </Button>
              <Input
                type='number'
                value={mintAmount}
                readOnly
                fontFamily="inherit"
                w="100px"
                h="40px"
                textAlign="center"
                pl="19px"
                mt="10px"
              />
              <Button
                onClick={handleIncrement}
                backgroundColor="#d6517d"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                p="15px"
                mt="10px"
              >
                  +
              </Button>
            </Flex>
            <Button
              onClick={handleMint}
              backgroundColor="#d6517d"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0f0f0f"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              p="15px"
              mt="10px"
            >
              Mint Now
            </Button>
          </div>
        ) : (
          <Text 
            mt="70px"
            fontSize="30px"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            color="#d6517d"
            letterSpacing="-5.5%"
          >
            You must be connected to Mint.
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export default MainMint