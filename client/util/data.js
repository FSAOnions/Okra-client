const local = "http://10.0.0.206:8080";
const loadAsset = (path) => {
  return `${local}${path}`;
};
export default [
  {
    product_name: "Caffè Americano",
    product_imgUrl: loadAsset("/Drink/Coffee/image.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 499,
    description:
      "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance.",
    product_type: "Drink",
    assets: {
      name: "coffee cup",
      source: loadAsset(`/Drink/Coffee/coffee_cup_obj.obj`),
      mtl: loadAsset(`/Drink/Coffee/coffee_cup_obj.mtl`),
      type: "OBJ",
      scale: 0.2,
      rotate: 0,
    },
  },
  {
    product_name: "Pizza",
    product_imgUrl: loadAsset("/Entree/Pizza/pizzaslice.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 499,
    description:
      "Thin-crust oven baked pizza topped with spicy pepperon, mozzarella, and homemade tomato sauce.",
    product_type: "Entree",
    assets: {
      name: "pizza",
      source: loadAsset(`/Entree/Pizza/Pizza.obj`),
      mtl: loadAsset(`/Entree/Pizza/Pizza.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Reuben",
    product_imgUrl: loadAsset("/Entree/Reuben/rubensandwich.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 699,
    description:
      "With layers of mouthwatering meat, yummy fillings (of your choice), and crunchy vegetables, Arby’s reuben sandwich is truly an iconic dish! Who can say no to a sandwich stuffed with flavorful sauces, melted cheese, and luscious meat fillings? ",
    product_type: "Entree",
    assets: {
      name: "reuben",
      source: loadAsset(
        `/Entree/Reuben/13931_Reuben_Sandwich_on_Plate_v2_L1.obj`
      ),
      mtl: loadAsset(`/Entree/Reuben/13931_Reuben_Sandwich_on_Plate_v2_L1.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Pie",
    product_imgUrl: loadAsset("/Dessert/Pie/pie.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1399,
    description:
      "Filled with the perfect blend of locally grown Granny Smith and Cortland apples, seasoned with a hint of cinnamon and sugar and topped with our original buttery flaky pie crust.",
    product_type: "Dessert",
    assets: {
      name: "pie",
      source: loadAsset(`/Dessert/Pie/11547_Dessert_pie_v3_l2.obj`),
      mtl: loadAsset(`/Dessert/Pie/11547_Dessert_pie_v3_l2.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Pretzel",
    product_imgUrl: loadAsset("/Appetizer/Pretzel/pretzel.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 499,
    description:
      "Mall pretzels that you can now enjoy in the comfort of your home for a fraction of the price with countless dipping sauce option! They are the perfect party food or snack to impress guests with and they really are easier to make than you’d think.",
    product_type: "Appetizer",
    assets: {
      name: "pretzel",
      source: loadAsset(
        `/Appetizer/Pretzel/13933_Big_Pretzel_on_Napkin_v3_l2.obj`
      ),
      mtl: loadAsset(
        `/Appetizer/Pretzel/13933_Big_Pretzel_on_Napkin_v3_l2.mtl`
      ),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Birthday Cake",
    product_imgUrl: loadAsset("/Dessert/BirthdayCake/cake.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1299,
    description:
      "This quadruple-layer cake isn't nearly as fussy to make as you might think. It starts out as a standard two-layer cake, then each layer is cut in half and stacked, with an easy filling in between the layers. The result is a moist cake that keeps well without refrigeration; looks spectacular when cut, and tastes even better than it looks!",
    product_type: "Dessert",
    assets: {
      name: "birthdaycake",
      source: loadAsset(`/Dessert/BirthdayCake/10868_birthday-cake_v3.obj`),
      mtl: loadAsset(`/Dessert/BirthdayCake/10868_birthday-cake_v3.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Cabernet Sauvignon",
    product_imgUrl: loadAsset("/Drink/Wine/wine.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 1099,
    description:
      "Woodbridge by Robert Mondavi Cabernet Sauvignon Red Wine is a medium-bodied California wine that opens with enticing aromas of cherries, berries, rich cedar, brown sugar, and toast.",
    product_type: "Drink",
    assets: {
      name: "red wine",
      source: loadAsset(`/Drink/Wine/14042_750_mL_Wine_Bottle_r_v1_L3.obj`),
      mtl: loadAsset(`/Drink/Wine/14042_750_mL_Wine_Bottle_r_v1_L3.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Coca Cola",
    product_imgUrl: loadAsset("/Drink/Soda/cokecan.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 199,
    description: "Cappuccino",
    product_type: "Drink",
    assets: {
      name: "cocacola",
      source: loadAsset(`/Drink/Soda/14025_Soda_Can_v3_l3.obj`),
      mtl: loadAsset(`/Drink/Soda/14025_Soda_Can_v3_l3.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
  {
    product_name: "Cupcake",
    product_imgUrl: loadAsset("/Dessert/Cupcake/cupcake.png"), //img from Sung
    threeD_imgUrl: "", //img with mtl and obj
    price: 199,
    description: "Yummy mmm good",
    product_type: "Dessert",
    assets: {
      name: "cupcake",
      source: loadAsset(`/Dessert/Cupcake/12187_Cupcake_v1_L3.obj`),
      mtl: loadAsset(`/Dessert/Cupcake/12187_Cupcake_v1_L3.mtl`),
      type: "OBJ",
      scale: 0.01,
      rotate: -90,
    },
  },
];
