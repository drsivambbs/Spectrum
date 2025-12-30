
export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  USER = 'User',
  GUEST = 'Guest'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export enum Designation {
  NATIONAL_ADMIN = 'National Admin',
  HUB_MANAGER = 'Hub Manager',
  COUNSELLOR = 'Counsellor',
  DOCTOR = 'Doctor'
}

export enum District {
  AMRITSAR = 'Amritsar, Punjab',
  BENGALURU = 'Bengaluru, Karnataka',
  CHENNAI = 'Chennai, Tamil Nadu',
  IMPHAL = 'Imphal, Manipur',
  WEST_DELHI = 'West Delhi, Delhi NCR'
}

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  PENDING = 'Pending'
}

export interface User {
  id: string; // This will be the phone number
  fullName: string;
  gender: Gender;
  mobileNumber: string; // 10 digits
  designation: Designation;
  district: District;
  status: UserStatus;
  password?: string; // Auto-generated
  bio: string;
  createdAt: string;
}
