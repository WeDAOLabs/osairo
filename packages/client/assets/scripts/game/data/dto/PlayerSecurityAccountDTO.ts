import { BaseDTO } from "../../../core/model/BaseDTO";

/**
 * "email": null,
        "phone": null,
        "has_set_master_password": true,
        "has_set_payment_password": false,
        "payment_password_updated_at": null
 */
export class PlayerSecurityAccountDTO extends BaseDTO {
  email: string | null = null;
  has_set_master_password = false;
  has_set_payment_password = false;
  payment_password_updated_at: string | null = null;
}
