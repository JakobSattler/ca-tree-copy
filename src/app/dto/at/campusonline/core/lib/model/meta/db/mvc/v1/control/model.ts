export interface ControlsDto {
}

export interface AbstractControlDto {
  _control:string;
}

export interface CallbackParamDto {
  _name?:string;
  _input?:string;
  _param?:string;
  _value?:string;
}

export interface CallbackDto {
  _method?:string;
  params?:Array<CallbackParamDto>;
}

export interface UpdateInputControlDto extends AbstractControlDto {
  _input:string;
  callback?:CallbackDto;
}

export interface FilterMvcControlsDto {
  'update-input'?:Array<UpdateInputControlDto>;
}

