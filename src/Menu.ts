export class MenuItem{ 
    id: number | 0;
    name: string | 'nix';
    price: number | -1;
    constructor(id?: number, name?: string, price?: number){
        this.id=id;
        this.name=name;
        this.price=price;
    }
}

export interface MenuItemType{
    id: number;
    name: string;
    price: number;
}

export interface MenuListType{
    menuList: MenuItem[];
}

export class MenuList{
    constructor(public menuList: MenuItem[]=[]){
    }
}

export class MenuUtils{

    getNewIndex(): number{
        return 1;
    }

    storeList(menuList: MenuList[]): void{
    }

    loadList(): MenuList{
        return new MenuList();
    }

    updateItem(id: number): void{

    }
}
