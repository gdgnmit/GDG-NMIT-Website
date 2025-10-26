export interface Member {
  _id: string;
  name: string;
  role: string;
  domain: string;
  tier: string;
  photoUrl?: string;
  teamId: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
}

export interface MemberTierGroup {
  past?: Member[];
  recruit?: Member[];
}

export type TierMembers = Member[] | MemberTierGroup;

export interface DomainMembers {
  [tier: string]: TierMembers;
}

export interface TeamInfo {
  _id: string;
  year: string;
  name: string;
  members: Record<string, string[]>;
}

export interface TeamData {
  team: TeamInfo;
  members: Record<string, DomainMembers>;
  year: string;
}

export interface ApiResponse {
  teams: TeamData[];
}