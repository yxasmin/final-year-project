const CHALLENGES = [
    {
        id: 1,
        title: "Eco Explorer",
        description: "Visit 3 new sustainable fashion websites and discover ethical brands.",
        tasks: [
            { id: 1, text: "Visit website 1"},
            { id: 2, text: "Visit website 2"},
            { id: 3, text: "Visit website 3"}
        ],
        badge: "/images/badge-eco-explorer.png"
        
    },
    {
        id: 2,
        title: "Generous Giver",
        description: "Donate 5 items of clothing to a charity shop or donation point.",
        tasks: [
            { id: 1, text: "Donate item 1"},
            { id: 2, text: "Donate item 2"},
            { id: 3, text: "Donate item 3"},
            { id: 4, text: "Donate item 4"},
            { id: 5, text: "Donate item 5"}
        ],
        badge: "/images/badge-generous-giver.png"
        
    },    
    {
        id: 3,
        title: "Repair Hero",
        description: "Repair 2 faulty items of clothing.",
        tasks: [
          {id: 1, text:  "Repair item 1"}, 
          {id: 2, text:  "Repair item 2"}  
        ],
        badge: "/images/badge-repair-hero.png"
        
    },
    {
        id: 4,
        title: "Style Chameleon",
        description: "Rewear and style the same item in 10 different ways.",
        tasks: Array.from({ length:10 }, (_, i) => ({
            id: i + 1,
            text: `Create outfit ${i + 1}`
        })),
        badge: "/images/badge-style-chameleon.png"
       
        
    },
    {
        id: 5,
        title: "Creator",
        description: "Make 3 upcycled clothing items.",
        tasks: [
          { id: 1, text: "Create item 1" },
          { id: 2, text: "Create item 2" },
          { id: 3, text: "Create item 3" }
      ],
        badge: "/images/badge-creator.png"    
    },

    {
        id: 6,
        title: "Swap Star",
        description: "Swap 7 items you own with a friend to refresh your wardrobe.",
        tasks: Array.from({ length: 7}, (_, i) => ({
          id: i + 1,
          text: `Swap item ${i + 1}`
        })),
        badge: "/images/badge-swap-star.png",
    },
];

export default CHALLENGES;
