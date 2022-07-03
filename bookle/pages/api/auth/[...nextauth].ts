import axios from "axios";
import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter";

export type CreateUserDto = {
  id: string,
  name: string,
  screenName: string,
  description: string,
  email: string,
  imgUrl: string,
  provider: string,
  oauthToken: string,
  oauthTokenSecret: string,
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const createUserDto: CreateUserDto = {
        id: profile.id_str as string,
        name: profile.name as string,
        screenName: profile.screen_name as string,
        description: profile.description as string,
        email: profile.email as string,
        imgUrl: user.image as string,
        provider: account.provider as string,
        oauthToken: account.oauth_token as string,
        oauthTokenSecret: account.oauth_token_secret as string,
      }
      // await axios.post('/api/user', createUserDto)
      await axios.get('/api/user')
      return true
    },
  }
})