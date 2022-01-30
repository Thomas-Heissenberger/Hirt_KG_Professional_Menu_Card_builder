import { writable, get, type Writable } from "svelte/store";
    

export enum WeekDays{
    Mo="Montag",
    Di="Dienstag",
    Mi="Mittwoch",
    Do="Donnerstag",
    Fr="Freitag",
    Sa="Samstag",
    So="Sonntag",
    Frei="Feiertag"
}

export interface MenuItemType{
    id: number;
    name: string;
    price: number;
}

export interface MenuListType{
    id: number;
    identifier: MenuUtils.Identifiers;
    menuList: MenuItemType[];
}

export class MenuItem implements MenuItemType{
    id: number;
    name: string;
    price: number;
    
    constructor(id: number=0, name: string="nix", price: number=-0.99){
        this.id=id;
        this.name=name;
        this.price=price;
    }

    static fromWeekItem(menuWeekItem: MenuItemType): MenuItem{
        return new MenuItem(menuWeekItem.id, menuWeekItem.name, menuWeekItem.price);
    }


    toString(){
        return `\n${this.id}: ${this.name} ${this.price}`;
    }
}

export class MenuItemWeek extends MenuItem implements MenuItemType { 
    date: Date;
    weekDay: WeekDays;
    
    constructor(id: number=0, name: string="nix", price: number=-0.99, date: Date=new Date(), weekDay: WeekDays=WeekDays.Mo){
        super(id, name, price);
        this.date=date;
        this.weekDay=weekDay;   
    }

    toString(){
        return `${super.toString()} ${this.date.getDay()} ${this.weekDay}`;
    }
}

export class MenuList implements MenuListType{
    constructor(public id: number= -1, public identifier: MenuUtils.Identifiers=MenuUtils.Identifiers.MENU_OVERVIEW, public menuList: MenuItemType[]=[]){}

    toString(){
        return `${this.id}: ${this.menuList}`; 
    }
}
export class MenuUtils{
    CACHED_LIST: Writable<MenuListType> = writable(undefined);
    private INITIAL_LOAD: boolean=true;

    constructor(){
        this.CACHED_LIST.subscribe(value => {
            if(value){
                if(!this.INITIAL_LOAD)
                    localStorage.setItem(value.identifier, JSON.stringify(value));
                console.log(`new Value cached: ${value}`);
            }
        });
    }

    getNewIndex(identifier: MenuUtils.Identifiers): number{
        if(get(this.CACHED_LIST)===undefined)
            this.loadList(identifier);
        let lastItem: MenuItemType = get(this.CACHED_LIST).menuList.pop();
        //* this.CACHED_LIST.menuList.push(lastItem);
        return lastItem.id+1;
    }

    storeList(identifier: MenuUtils.Identifiers, menuList: MenuListType): void{
        this.CACHED_LIST.set(menuList);
    }

    loadList(identifier: MenuUtils.Identifiers): MenuListType{
        if(get(this.CACHED_LIST)===undefined){
            let menu: MenuListType=JSON.parse(localStorage.getItem("CACHED_LIST"));
          //  console.log(menu.menuList);
            this.CACHED_LIST.set(menu);
            this.INITIAL_LOAD=false;
        }
        return get(this.CACHED_LIST);
    }

    updateItem(identifier: MenuUtils.Identifiers, newItem: MenuItemType): void{ 
      let newList=this.loadList(identifier);
      newList.menuList[newList.menuList.findIndex(item=>item.id===newItem.id)]=newItem;
      this.storeList(identifier, newList);
    }
}
export namespace MenuUtils{
    export enum Identifiers{
     MENU_OVERVIEW = "MENU_OVERVIEW",
     MENU_WEEK_LIST = "MENU_WEEK_LIST",
    }
}
