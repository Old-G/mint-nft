import Facebook from '../assets/social-media-icons/facebook_32x32.png'
import Twitter from '../assets/social-media-icons/twitter_32x32.png'
import Email from '../assets/social-media-icons/email_32x32.png'
import { Box, Button, Flex, Image, Link } from '@chakra-ui/react'

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0])

  async function connectAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    setAccounts(account)
  }

  return (
    <Flex justify="space-between" align='center' p='30px'>
      <Flex justify="space-around" width='40%' p='0 75px'>
        <Link href='https://facebook.com'>
          <Image src={Facebook} alt="Facebook" boxSize="42px" margin="0 15px" />
        </Link>
        <Link href='https://twitter.com'>
          <Image src={Twitter} alt="Twitter" boxSize="42px" margin="0 15px" />
        </Link>
        <Link href='https://gmail.com'>
          <Image src={Email} alt="Email" boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>

      <Flex justify='space-around' align='center' width='40%' p='30px'>
        <Box m='0 15px'>About</Box>
        <Box m='0 15px'>Mint</Box>
        <Box m='0 15px'>Team</Box>

        {isConnected ? (
          <Box m='0 15px'>Connected</Box>
        ) : (
          <Button 
            onClick={connectAccount}
            backgroundColor="#d6517d"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0f0f0f"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            p="15px"
            m="0 15px"
          >
              Connect
          </Button>
        )}
      </Flex>

      
    </Flex>
  )
}

export default NavBar