import { ParticleNetwork } from "@particle-network/auth";
import {
  PolygonMumbai,
  ArbitrumGoerli,
  EthereumSepolia,
  ChainInfo,
} from "@particle-network/chains";
import { ParticleProvider } from "@particle-network/provider";

// "email", "phone", "facebook", "google", "apple", "discord", "github", "twitch", "twitter", "microsoft", "linkedin", "jwt"
enum SocialLoginType {
  Twitter = "twitter",
  Github = "github",
  Google = "google",
  Phone = "phone",
  JWT = "jwt",
}

class ParticleService {
  private _client: ParticleNetwork | null = null;
  private _particleProvider: ParticleProvider | null = null;

  get appId(): string {
    // @ts-ignore
    return import.meta.env.VUE_APP_PARTICLE_APP_ID ?? "";
  }

  get projectId(): string {
    // @ts-ignore
    return import.meta.env.VUE_APP_PARTICLE_PROJECT_ID ?? "";
  }

  get clientKey(): string {
    // @ts-ignore
    return import.meta.env.VUE_APP_PARTICLE_CLIENT_KEY ?? "";
  }

  get secretKey(): string {
    // @ts-ignore
    return import.meta.env.VUE_APP_PARTICLE_SECRET_KEY ?? "";
  }

  get client(): ParticleNetwork {
    if (!this._client) {
      this._client = new ParticleNetwork({
        projectId: this.projectId,
        clientKey: this.clientKey,
        appId: this.appId,
        chainName: PolygonMumbai.name,
        chainId: PolygonMumbai.id,
      });
    }
    return this._client;
  }

  public getClient(chain: ChainInfo): ParticleNetwork {
    if (!this._client) {
      this._client = new ParticleNetwork({
        projectId: this.projectId,
        clientKey: this.clientKey,
        appId: this.appId,
        chainName: chain.name,
        chainId: chain.id,
      });
    }
    return this._client;
  }

  public clearChainInfo() {
    this._client = null;
    this._particleProvider = null;
  }

  private get particleProvider(): ParticleProvider {
    if (!this._particleProvider) {
      this._particleProvider = new ParticleProvider(this.client.auth);
    }
    return this._particleProvider;
  }

  /**
   * {
    "uuid": "cb93d800-3126-4c76-9fc9-08db8108423d",
    "created_at": "2023-10-25T08:03:01.000Z",
    "updated_at": "2023-10-25T08:03:01.000Z",
    "phone": null,
    "email": null,
    "name": "enixlee0x00",
    "avatar": "",
    "facebook_id": null,
    "facebook_email": null,
    "google_id": null,
    "google_email": null,
    "apple_id": null,
    "apple_email": null,
    "twitter_id": "1526755844737880064",
    "twitter_email": "",
    "telegram_id": null,
    "telegram_phone": null,
    "discord_id": null,
    "discord_email": null,
    "github_id": null,
    "github_email": null,
    "twitch_id": null,
    "twitch_email": null,
    "microsoft_id": null,
    "microsoft_email": null,
    "linkedin_id": null,
    "linkedin_email": null,
    "jwt_id": null,
    "passkeys_id": null,
    "thirdparty_user_info": {
        "provider": "twitterv1",
        "user_info": {
            "id": "1526755844737880064",
            "name": "enixlee0x00",
            "email": "",
            "picture": ""
        }
    },
    "token": "waawadawdadasdasdaasdad",
    "security_account": {
        "email": null,
        "phone": null,
        "has_set_master_password": true,
        "has_set_payment_password": false,
        "payment_password_updated_at": null
    },
    "wallets": [
        {
            "uuid": "aa4e1919-88c9-4d8f-8dd9-63dbc01151d6",
            "chain_name": "solana",
            "public_address": "3BPv3MiCkhRAddsrGe9mdxFWy9CyT5WTQeWxMXYhLZQc"
        },
        {
            "uuid": "b1b3588e-a2eb-414d-864b-6d785b04abbd",
            "chain_name": "evm_chain",
            "public_address": "0xd9e5bee269EFfD7d3BFA92332813C913E4B9999F"
        }
    ],
    "redirect_type": "login"
}
   */
  async loginWithSocialAccount(loginType = SocialLoginType.Twitter) {
    const userInfo = await this.client.auth.login({
      preferredAuthType: loginType,
    });
    console.log(userInfo);
  }
}

export const Particle = {
  SocialLoginType,
  service: new ParticleService(),
  chains: [PolygonMumbai, ArbitrumGoerli, EthereumSepolia],
};
