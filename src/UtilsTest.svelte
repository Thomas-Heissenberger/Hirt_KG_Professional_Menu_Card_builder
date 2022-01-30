<script lang="ts">
    import { MenuUtils, MenuList, WeekDays, MenuItem, MenuItemWeek } from './Menu';

    let utils = new MenuUtils();

  
    let weekList = new MenuList(2, MenuUtils.Identifiers.MENU_WEEK_LIST,[ 
       new MenuItemWeek(1, "schnitzel", 10.50, new Date(), WeekDays.Sa),
       new MenuItemWeek(2, "ma guat", 1.00, new Date(), WeekDays.Sa),
       new MenuItemWeek(3, "mc 2 suppn", 4.99, new Date(), WeekDays.Sa) 
      ]);

    let overview = new MenuList(1, MenuUtils.Identifiers.MENU_OVERVIEW, weekList.menuList.map(item=>MenuItem.fromWeekItem(item)));
  
     
      //utils.storeList(list);
      console.log(MenuUtils.Identifiers.MENU_WEEK_LIST, utils.loadList(MenuUtils.Identifiers.MENU_WEEK_LIST));
      utils.storeList(MenuUtils.Identifiers.MENU_WEEK_LIST, weekList);
      utils.updateItem(MenuUtils.Identifiers.MENU_WEEK_LIST, new MenuItemWeek(2, "ma guat", 0.99, new Date(), WeekDays.So));
      console.log("NEW INDEX: "+ utils.getNewIndex(MenuUtils.Identifiers.MENU_WEEK_LIST));

      utils.storeList(MenuUtils.Identifiers.MENU_OVERVIEW, overview);

    const TRUE : boolean = true;
    

  </script>