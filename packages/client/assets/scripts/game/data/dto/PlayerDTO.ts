import { BaseDTO } from "../../../core/model/BaseDTO";
import { PropertyType } from "../../../core/model/DataDecorators";
import { PlayerSecurityAccountDTO } from "./PlayerSecurityAccountDTO";
import { WalletDTO } from "./WalletDTO";

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
export class PlayerDTO extends BaseDTO {
  uuid: string = "";
  created_at: string = "";
  updated_at: string = "";
  phone: string | null = null;
  email: string | null = null;
  name: string = "";
  avatar: string = "";
  twitter_id: string | null = null;
  jwt_id: string | null = null;
  passkeys_id: string | null = null;
  token: string | null = null;
  @PropertyType(PlayerSecurityAccountDTO)
  security_account: PlayerSecurityAccountDTO | null = null;
  @PropertyType(WalletDTO)
  wallets: WalletDTO[] = [];
  redirect_type: string = "";

  get wallet(): WalletDTO {
    const index = this.wallets.findIndex((w) => w.isEvm);
    return this.wallets[index];
  }

  get address(): string {
    return this?.wallet?.address;
  }
}
