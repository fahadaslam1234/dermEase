export class NavModule{
    name!: string;
    tiles!: NavModuleItem[]
    role: [];
    icon!:string;
    hidden?: boolean;
  }

  export class NavModuleItem{
    title!: string;
    icon!: string;
    component!: any;
    permission!: string;
    modulename!:string;
    roles!: any
  }
