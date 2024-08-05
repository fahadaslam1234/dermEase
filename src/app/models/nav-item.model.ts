export class NavModule{
    name!: string;
    tiles!: NavModuleItem[]
    role!: string;
    icon!:string;
    hidden?: boolean;
  }
  
  export class NavModuleItem{
    title!: string;
    icon!: string;
    component!: any;
    permission!: string;
    modulename!:string
  }
  