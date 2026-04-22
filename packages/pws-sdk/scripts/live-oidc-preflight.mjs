import { preparePwsOidcLogin } from '../dist/index.js'

const login = await preparePwsOidcLogin('https://pass.kmupartnergroup.ch/api/', {
  database: 'pg',
  username: 'lukas.zbinden@kmupartnergroup.ch',
  redirectUrl: 'https://example.com/callback',
})

console.log(
  JSON.stringify(
    {
      ok: true,
      providerId: login.providerId,
      redirectUrl: login.redirectUrl,
      loginUrl: login.loginUrl,
    },
    null,
    2,
  ),
)
