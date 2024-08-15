// questions.js
export const questions = [

  { id: 'category1', category: 'שאלות כלליות', type: 'header' },
  { id: 'husbandName', type: 'text', question: 'שם הבעל' },
  { id: 'wifeName', type: 'text', question: 'שם האישה' },
  { id: 'familyName', type: 'text', question: 'שם משפחה' },
  { id: 'childrenCount', type: 'number', question: 'מספר ילדים' },
  { id: 'childrenAges', type: 'text', question: 'גילאי הילדים' },
  { id: 'occupation', type: 'text', question: 'תחומי עיסוק' },
  { id: 'hobbies', type: 'text', question: 'תחביבים' },

  { id: 'category2', category: 'שאלות כלליות על המגרש והמבנה', type: 'header' },
  { id: 'plotSize', type: 'number', question: 'שטח המגרש (במ"ר)' },
  { id: 'buildingSize', type: 'number', question: 'שטח בנייה משוער (במ"ר)' },
  { id: 'floors', type: 'number', question: 'מספר קומות' },
  { id: 'budget', type: 'number', question: 'תקציב (בש"ח)' },
  { id: 'buildingTech', type: 'text', question: 'טכנולוגיית בניה' },

  { id: 'category3', category: 'פרוגרמת חללים', type: 'header' },
  { id: 'childrenRooms', type: 'number', question: 'כמות חדרי שינה לילדים' },
  { id: 'childrenPerRoom', type: 'text', question: 'כמה ילדים בכל חדר' },
  { id: 'childRoomFeatures', type: 'text', question: 'אילו שימושים חשוב שיכלול חדר שינה לילד?' },
  { id: 'guestRoom', type: 'select', question: 'האם נדרש חדר אירוח?', options: ['כן', 'לא'] },
  { id: 'parentCloset', type: 'select', question: 'האם חדר השינה של ההורים יכלול חדר ארונות?', options: ['כן', 'לא'] },
  { id: 'parentBathroom', type: 'select', question: 'האם חדר השינה של ההורים יכלול חדר אמבטיה צמוד?', options: ['כן', 'לא'] },
  { id: 'parentBathroomType', type: 'select', question: 'סוג חדר רחצה הורים', options: ['אמבטיה', 'מקלחון'], dependsOn: 'parentBathroom' },
  { id: 'guestToilet', type: 'select', question: 'האם נדרש שירותי אורחים?', options: ['כן', 'לא'] },
  { id: 'guestToiletWindow', type: 'select', question: 'האם נדרש חלון בשירותי אורחים?', options: ['כן', 'לא', 'מספיק ונטה'], dependsOn: 'guestToilet' },
  { id: 'publicSpaceType', type: 'select', question: 'אופי נדרש של החלל הציבורי', options: ['פתוח', 'סגור'] },
  { id: 'kitchenType', type: 'select', question: 'אופי מטבח', options: ['עם אי', 'בלי אי', 'מקרר אינטגרלי'] },
  { id: 'kitchenCounterLength', type: 'number', question: 'אורך שיש במטבח (במטרים)' },
  { id: 'entranceType', type: 'text', question: 'אופי מבואת כניסה' },
  { id: 'playroom', type: 'select', question: 'האם נדרש חדר משחקים?', options: ['כן', 'לא'] },

  { id: 'category4', category: 'חצר', type: 'header' },
  { id: 'yardCharacter', type: 'text', question: 'מה האופי הרצוי של החצר?' },
  { id: 'outdoorKitchen', type: 'select', question: 'האם נדרש מטבח חוץ?', options: ['כן', 'לא'] },
  { id: 'pool', type: 'select', question: 'האם נדרשת בריכה?', options: ['כן', 'לא'] },
  { id: 'lawn', type: 'select', question: 'האם נדרשת מדשאה?', options: ['כן', 'לא'] },
  { id: 'trampoline', type: 'select', question: 'האם נדרשת טרמפולינה לילדים?', options: ['כן', 'לא'] },
  { id: 'firepit', type: 'select', question: 'האם נדרשת פינת מדורה?', options: ['כן', 'לא'] },
  { id: 'parkingSpaces', type: 'number', question: 'מספר חניות' },
  { id: 'accessibility', type: 'select', question: 'האם נדרשת נגישות למבנה?', options: ['כן', 'לא'] },
  { id: 'gardening', type: 'select', question: 'האם אוהבים גינון?', options: ['כן', 'לא'] },
  { id: 'storage', type: 'select', question: 'האם נדרש מחסן?', options: ['כן', 'לא'] }

  // ... Add more questions as needed
];