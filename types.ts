import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { User, GlobalRole, MembershipRole, Organization } from "db"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = MembershipRole | GlobalRole

export type ITwitterUser = {
  twitterId: string | null
  twitterUsername: string | null
  twitterName: string | null
  twitterBio: string | null
  twitterProfilePictureUrl: string | null
}

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      roles: Array<Role>
      subscriptionStatus: Organization["subscriptionStatus"]
      orgId?: Organization["id"]
    }
  }
}
