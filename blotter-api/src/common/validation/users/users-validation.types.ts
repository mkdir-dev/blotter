export interface UserValid {
  IsString: string;
  IsNotEmpty: string;
}

export interface UsernameValid extends UserValid {
  MinLength: string;
  MaxLength: string;
}

export interface PasswordValid extends UserValid {
  MinLength: string;
}

export interface EmailValid extends UserValid {
  MinLength: string;
  IsEmail: string;
}

export interface PhoneValid extends UserValid {
  IsPhoneNumber: string;
}

export interface EnumValid extends UserValid {
  IsEnum: string;
}
