const fontSize = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96]
const tds = new Array(50).fill(1)

export { path, emotions, fontSize, tds }

export const EMOTIONS = [
  {
    icon: '💯',
    name: '100'
  },
  {
    icon: '🔢',
    name: '1234'
  },
  {
    icon: '😀',
    name: 'grinning'
  },
  {
    icon: '😬',
    name: 'grimacing'
  },
  {
    icon: '😁',
    name: 'grin'
  },
  {
    icon: '😂',
    name: 'joy'
  },
  {
    icon: '🤣',
    name: 'rofl'
  },
  {
    icon: '🥳',
    name: 'partying'
  },
  {
    icon: '😃',
    name: 'smiley'
  },
  {
    icon: '😄',
    name: 'smile'
  },
  {
    icon: '😅',
    name: 'sweat smile'
  },
  {
    icon: '😆',
    name: 'laughing'
  },
  {
    icon: '😇',
    name: 'innocent'
  },
  {
    icon: '😉',
    name: 'wink'
  },
  {
    icon: '😊',
    name: 'blush'
  },
  {
    icon: '🙂',
    name: 'slightly smiling face'
  },
  {
    icon: '🙃',
    name: 'upside down face'
  },
  {
    icon: '☺️',
    name: 'relaxed'
  },
  {
    icon: '😋',
    name: 'yum'
  },
  {
    icon: '😌',
    name: 'relieved'
  },
  {
    icon: '😍',
    name: 'heart eyes'
  },
  {
    icon: '🥰',
    name: 'smiling face with three hearts'
  },
  {
    icon: '😘',
    name: 'kissing heart'
  },
  {
    icon: '😗',
    name: 'kissing'
  },
  {
    icon: '😙',
    name: 'kissing smiling eyes'
  },
  {
    icon: '😚',
    name: 'kissing closed eyes'
  },
  {
    icon: '😜',
    name: 'stuck out tongue winking eye'
  },
  {
    icon: '🤪',
    name: 'zany'
  },
  {
    icon: '🤨',
    name: 'raised eyebrow'
  },
  {
    icon: '🧐',
    name: 'monocle'
  },
  {
    icon: '😝',
    name: 'stuck out tongue closed eyes'
  },
  {
    icon: '😛',
    name: 'stuck out tongue'
  },
  {
    icon: '🤑',
    name: 'money mouth face'
  },
  {
    icon: '🤓',
    name: 'nerd face'
  },
  {
    icon: '😎',
    name: 'sunglasses'
  },
  {
    icon: '🤩',
    name: 'star struck'
  },
  {
    icon: '🤡',
    name: 'clown face'
  },
  {
    icon: '🤠',
    name: 'cowboy hat face'
  },
  {
    icon: '🤗',
    name: 'hugs'
  },
  {
    icon: '😏',
    name: 'smirk'
  },
  {
    icon: '😶',
    name: 'no mouth'
  },
  {
    icon: '😐',
    name: 'neutral face'
  },
  {
    icon: '😑',
    name: 'expressionless'
  },
  {
    icon: '😒',
    name: 'unamused'
  },
  {
    icon: '🙄',
    name: 'roll eyes'
  },
  {
    icon: '🤔',
    name: 'thinking'
  },
  {
    icon: '🤥',
    name: 'lying face'
  },
  {
    icon: '🤭',
    name: 'hand over mouth'
  },
  {
    icon: '🤫',
    name: 'shushing'
  },
  {
    icon: '🤬',
    name: 'symbols over mouth'
  },
  {
    icon: '🤯',
    name: 'exploding head'
  },
  {
    icon: '😳',
    name: 'flushed'
  },
  {
    icon: '😞',
    name: 'disappointed'
  },
  {
    icon: '😟',
    name: 'worried'
  },
  {
    icon: '😠',
    name: 'angry'
  },
  {
    icon: '😡',
    name: 'rage'
  },
  {
    icon: '😔',
    name: 'pensive'
  },
  {
    icon: '😕',
    name: 'confused'
  },
  {
    icon: '🙁',
    name: 'slightly frowning face'
  },
  {
    icon: '☹',
    name: 'frowning face'
  },
  {
    icon: '😣',
    name: 'persevere'
  },
  {
    icon: '😖',
    name: 'confounded'
  },
  {
    icon: '😫',
    name: 'tired face'
  },
  {
    icon: '😩',
    name: 'weary'
  },
  {
    icon: '🥺',
    name: 'pleading'
  },
  {
    icon: '😤',
    name: 'triumph'
  },
  {
    icon: '😮',
    name: 'open mouth'
  },
  {
    icon: '😱',
    name: 'scream'
  },
  {
    icon: '😨',
    name: 'fearful'
  },
  {
    icon: '😰',
    name: 'cold sweat'
  },
  {
    icon: '😯',
    name: 'hushed'
  },
  {
    icon: '😦',
    name: 'frowning'
  },
  {
    icon: '😧',
    name: 'anguished'
  },
  {
    icon: '😢',
    name: 'cry'
  },
  {
    icon: '😥',
    name: 'disappointed relieved'
  },
  {
    icon: '🤤',
    name: 'drooling face'
  },
  {
    icon: '😪',
    name: 'sleepy'
  },
  {
    icon: '😓',
    name: 'sweat'
  },
  {
    icon: '🥵',
    name: 'hot'
  },
  {
    icon: '🥶',
    name: 'cold'
  },
  {
    icon: '😭',
    name: 'sob'
  },
  {
    icon: '😵',
    name: 'dizzy face'
  },
  {
    icon: '😲',
    name: 'astonished'
  },
  {
    icon: '🤐',
    name: 'zipper mouth face'
  },
  {
    icon: '🤢',
    name: 'nauseated face'
  },
  {
    icon: '🤧',
    name: 'sneezing face'
  },
  {
    icon: '🤮',
    name: 'vomiting'
  },
  {
    icon: '😷',
    name: 'mask'
  },
  {
    icon: '🤒',
    name: 'face with thermometer'
  },
  {
    icon: '🤕',
    name: 'face with head bandage'
  },
  {
    icon: '🥴',
    name: 'woozy'
  },
  {
    icon: '😴',
    name: 'sleeping'
  },
  {
    icon: '💤',
    name: 'zzz'
  },
  {
    icon: '💩',
    name: 'poop'
  },
  {
    icon: '😈',
    name: 'smiling imp'
  },
  {
    icon: '👿',
    name: 'imp'
  },
  {
    icon: '👹',
    name: 'japanese ogre'
  },
  {
    icon: '👺',
    name: 'japanese goblin'
  },
  {
    icon: '💀',
    name: 'skull'
  },
  {
    icon: '👻',
    name: 'ghost'
  },
  {
    icon: '👽',
    name: 'alien'
  },
  {
    icon: '🤖',
    name: 'robot'
  },
  {
    icon: '😺',
    name: 'smiley cat'
  },
  {
    icon: '😸',
    name: 'smile cat'
  },
  {
    icon: '😹',
    name: 'joy cat'
  },
  {
    icon: '😻',
    name: 'heart eyes cat'
  },
  {
    icon: '😼',
    name: 'smirk cat'
  },
  {
    icon: '😽',
    name: 'kissing cat'
  },
  {
    icon: '🙀',
    name: 'scream cat'
  },
  {
    icon: '😿',
    name: 'crying cat face'
  },
  {
    icon: '😾',
    name: 'pouting cat'
  },
  {
    icon: '🤲',
    name: 'palms up'
  },
  {
    icon: '🙌',
    name: 'raised hands'
  },
  {
    icon: '👏',
    name: 'clap'
  },
  {
    icon: '👋',
    name: 'wave'
  },
  {
    icon: '🤙',
    name: 'call me hand'
  },
  {
    icon: '👍',
    name: '+1'
  },
  {
    icon: '👎',
    name: ' 1'
  },
  {
    icon: '👊',
    name: 'facepunch'
  },
  {
    icon: '✊',
    name: 'fist'
  },
  {
    icon: '🤛',
    name: 'fist left'
  },
  {
    icon: '🤜',
    name: 'fist right'
  },
  {
    icon: '✌',
    name: 'v'
  },
  {
    icon: '👌',
    name: 'ok hand'
  },
  {
    icon: '✋',
    name: 'raised hand'
  },
  {
    icon: '🤚',
    name: 'raised back of hand'
  },
  {
    icon: '👐',
    name: 'open hands'
  },
  {
    icon: '💪',
    name: 'muscle'
  },
  {
    icon: '🙏',
    name: 'pray'
  },
  {
    icon: '🦶',
    name: 'foot'
  },
  {
    icon: '🦵',
    name: 'leg'
  },
  {
    icon: '🤝',
    name: 'handshake'
  },
  {
    icon: '☝',
    name: 'point up'
  },
  {
    icon: '👆',
    name: 'point up 2'
  },
  {
    icon: '👇',
    name: 'point down'
  },
  {
    icon: '👈',
    name: 'point left'
  },
  {
    icon: '👉',
    name: 'point right'
  },
  {
    icon: '🖕',
    name: 'fu'
  },
  {
    icon: '🖐',
    name: 'raised hand with fingers splayed'
  },
  {
    icon: '🤟',
    name: 'love you'
  },
  {
    icon: '🤘',
    name: 'metal'
  },
  {
    icon: '🤞',
    name: 'crossed fingers'
  },
  {
    icon: '🖖',
    name: 'vulcan salute'
  },
  {
    icon: '✍',
    name: 'writing hand'
  },
  {
    icon: '🤳',
    name: 'selfie'
  },
  {
    icon: '💅',
    name: 'nail care'
  },
  {
    icon: '👄',
    name: 'lips'
  },
  {
    icon: '🦷',
    name: 'tooth'
  },
  {
    icon: '👅',
    name: 'tongue'
  },
  {
    icon: '👂',
    name: 'ear'
  },
  {
    icon: '👃',
    name: 'nose'
  },
  {
    icon: '👁',
    name: 'eye'
  },
  {
    icon: '👀',
    name: 'eyes'
  },
  {
    icon: '🧠',
    name: 'brain'
  },
  {
    icon: '👤',
    name: 'bust in silhouette'
  },
  {
    icon: '👥',
    name: 'busts in silhouette'
  },
  {
    icon: '🗣',
    name: 'speaking head'
  },
  {
    icon: '👶',
    name: 'baby'
  },
  {
    icon: '🧒',
    name: 'child'
  },
  {
    icon: '👦',
    name: 'boy'
  },
  {
    icon: '👧',
    name: 'girl'
  },
  {
    icon: '🧑',
    name: 'adult'
  },
  {
    icon: '👨',
    name: 'man'
  },
  {
    icon: '👩',
    name: 'woman'
  },
  {
    icon: '👱‍♀️',
    name: 'blonde woman'
  },
  {
    icon: '👱',
    name: 'blonde man'
  },
  {
    icon: '🧔',
    name: 'bearded person'
  },
  {
    icon: '🧓',
    name: 'older adult'
  },
  {
    icon: '👴',
    name: 'older man'
  },
  {
    icon: '👵',
    name: 'older woman'
  },
  {
    icon: '👲',
    name: 'man with gua pi mao'
  },
  {
    icon: '🧕',
    name: 'woman with headscarf'
  },
  {
    icon: '👳‍♀️',
    name: 'woman with turban'
  },
  {
    icon: '👳',
    name: 'man with turban'
  },
  {
    icon: '👮‍♀️',
    name: 'policewoman'
  },
  {
    icon: '👮',
    name: 'policeman'
  },
  {
    icon: '👷‍♀️',
    name: 'construction worker woman'
  },
  {
    icon: '👷',
    name: 'construction worker man'
  },
  {
    icon: '💂‍♀️',
    name: 'guardswoman'
  },
  {
    icon: '💂',
    name: 'guardsman'
  },
  {
    icon: '🕵️‍♀️',
    name: 'female detective'
  },
  {
    icon: '🕵',
    name: 'male detective'
  },
  {
    icon: '👩‍⚕️',
    name: 'woman health worker'
  },
  {
    icon: '👨‍⚕️',
    name: 'man health worker'
  },
  {
    icon: '👩‍🌾',
    name: 'woman farmer'
  },
  {
    icon: '👨‍🌾',
    name: 'man farmer'
  },
  {
    icon: '👩‍🍳',
    name: 'woman cook'
  },
  {
    icon: '👨‍🍳',
    name: 'man cook'
  },
  {
    icon: '👩‍🎓',
    name: 'woman student'
  },
  {
    icon: '👨‍🎓',
    name: 'man student'
  },
  {
    icon: '👩‍🎤',
    name: 'woman singer'
  },
  {
    icon: '👨‍🎤',
    name: 'man singer'
  },
  {
    icon: '👩‍🏫',
    name: 'woman teacher'
  },
  {
    icon: '👨‍🏫',
    name: 'man teacher'
  },
  {
    icon: '👩‍🏭',
    name: 'woman factory worker'
  },
  {
    icon: '👨‍🏭',
    name: 'man factory worker'
  },
  {
    icon: '👩‍💻',
    name: 'woman technologist'
  },
  {
    icon: '👨‍💻',
    name: 'man technologist'
  },
  {
    icon: '👩‍💼',
    name: 'woman office worker'
  },
  {
    icon: '👨‍💼',
    name: 'man office worker'
  },
  {
    icon: '👩‍🔧',
    name: 'woman mechanic'
  },
  {
    icon: '👨‍🔧',
    name: 'man mechanic'
  },
  {
    icon: '👩‍🔬',
    name: 'woman scientist'
  },
  {
    icon: '👨‍🔬',
    name: 'man scientist'
  },
  {
    icon: '👩‍🎨',
    name: 'woman artist'
  },
  {
    icon: '👨‍🎨',
    name: 'man artist'
  },
  {
    icon: '👩‍🚒',
    name: 'woman firefighter'
  },
  {
    icon: '👨‍🚒',
    name: 'man firefighter'
  },
  {
    icon: '👩‍✈️',
    name: 'woman pilot'
  },
  {
    icon: '👨‍✈️',
    name: 'man pilot'
  },
  {
    icon: '👩‍🚀',
    name: 'woman astronaut'
  },
  {
    icon: '👨‍🚀',
    name: 'man astronaut'
  },
  {
    icon: '👩‍⚖️',
    name: 'woman judge'
  },
  {
    icon: '👨‍⚖️',
    name: 'man judge'
  },
  {
    icon: '🦸‍♀️',
    name: 'woman superhero'
  },
  {
    icon: '🦸‍♂️',
    name: 'man superhero'
  },
  {
    icon: '🦹‍♀️',
    name: 'woman supervillain'
  },
  {
    icon: '🦹‍♂️',
    name: 'man supervillain'
  },
  {
    icon: '🤶',
    name: 'mrs claus'
  },
  {
    icon: '🎅',
    name: 'santa'
  },
  {
    icon: '🧙‍♀️',
    name: 'sorceress'
  },
  {
    icon: '🧙‍♂️',
    name: 'wizard'
  },
  {
    icon: '🧝‍♀️',
    name: 'woman elf'
  },
  {
    icon: '🧝‍♂️',
    name: 'man elf'
  },
  {
    icon: '🧛‍♀️',
    name: 'woman vampire'
  },
  {
    icon: '🧛‍♂️',
    name: 'man vampire'
  },
  {
    icon: '🧟‍♀️',
    name: 'woman zombie'
  },
  {
    icon: '🧟‍♂️',
    name: 'man zombie'
  },
  {
    icon: '🧞‍♀️',
    name: 'woman genie'
  },
  {
    icon: '🧞‍♂️',
    name: 'man genie'
  },
  {
    icon: '🧜‍♀️',
    name: 'mermaid'
  },
  {
    icon: '🧜‍♂️',
    name: 'merman'
  },
  {
    icon: '🧚‍♀️',
    name: 'woman fairy'
  },
  {
    icon: '🧚‍♂️',
    name: 'man fairy'
  },
  {
    icon: '👼',
    name: 'angel'
  },
  {
    icon: '🤰',
    name: 'pregnant woman'
  },
  {
    icon: '🤱',
    name: 'breastfeeding'
  },
  {
    icon: '👸',
    name: 'princess'
  },
  {
    icon: '🤴',
    name: 'prince'
  },
  {
    icon: '👰',
    name: 'bride with veil'
  },
  {
    icon: '🤵',
    name: 'man in tuxedo'
  },
  {
    icon: '🏃‍♀️',
    name: 'running woman'
  },
  {
    icon: '🏃',
    name: 'running man'
  },
  {
    icon: '🚶‍♀️',
    name: 'walking woman'
  },
  {
    icon: '🚶',
    name: 'walking man'
  },
  {
    icon: '💃',
    name: 'dancer'
  },
  {
    icon: '🕺',
    name: 'man dancing'
  },
  {
    icon: '👯',
    name: 'dancing women'
  },
  {
    icon: '👯‍♂️',
    name: 'dancing men'
  },
  {
    icon: '👫',
    name: 'couple'
  },
  {
    icon: '👬',
    name: 'two men holding hands'
  },
  {
    icon: '👭',
    name: 'two women holding hands'
  },
  {
    icon: '🙇‍♀️',
    name: 'bowing woman'
  },
  {
    icon: '🙇',
    name: 'bowing man'
  },
  {
    icon: '🤦‍♂️',
    name: 'man facepalming'
  },
  {
    icon: '🤦‍♀️',
    name: 'woman facepalming'
  },
  {
    icon: '🤷',
    name: 'woman shrugging'
  },
  {
    icon: '🤷‍♂️',
    name: 'man shrugging'
  },
  {
    icon: '💁',
    name: 'tipping hand woman'
  },
  {
    icon: '💁‍♂️',
    name: 'tipping hand man'
  },
  {
    icon: '🙅',
    name: 'no good woman'
  },
  {
    icon: '🙅‍♂️',
    name: 'no good man'
  },
  {
    icon: '🙆',
    name: 'ok woman'
  },
  {
    icon: '🙆‍♂️',
    name: 'ok man'
  },
  {
    icon: '🙋',
    name: 'raising hand woman'
  },
  {
    icon: '🙋‍♂️',
    name: 'raising hand man'
  },
  {
    icon: '🙎',
    name: 'pouting woman'
  },
  {
    icon: '🙎‍♂️',
    name: 'pouting man'
  },
  {
    icon: '🙍',
    name: 'frowning woman'
  },
  {
    icon: '🙍‍♂️',
    name: 'frowning man'
  },
  {
    icon: '💇',
    name: 'haircut woman'
  },
  {
    icon: '💇‍♂️',
    name: 'haircut man'
  },
  {
    icon: '💆',
    name: 'massage woman'
  },
  {
    icon: '💆‍♂️',
    name: 'massage man'
  },
  {
    icon: '🧖‍♀️',
    name: 'woman in steamy room'
  },
  {
    icon: '🧖‍♂️',
    name: 'man in steamy room'
  },
  {
    icon: '💑',
    name: 'couple with heart woman man'
  },
  {
    icon: '👩‍❤️‍👩',
    name: 'couple with heart woman woman'
  },
  {
    icon: '👨‍❤️‍👨',
    name: 'couple with heart man man'
  },
  {
    icon: '💏',
    name: 'couplekiss man woman'
  },
  {
    icon: '👩‍❤️‍💋‍👩',
    name: 'couplekiss woman woman'
  },
  {
    icon: '👨‍❤️‍💋‍👨',
    name: 'couplekiss man man'
  },
  {
    icon: '👪',
    name: 'family man woman boy'
  },
  {
    icon: '👨‍👩‍👧',
    name: 'family man woman girl'
  },
  {
    icon: '👨‍👩‍👧‍👦',
    name: 'family man woman girl boy'
  },
  {
    icon: '👨‍👩‍👦‍👦',
    name: 'family man woman boy boy'
  },
  {
    icon: '👨‍👩‍👧‍👧',
    name: 'family man woman girl girl'
  },
  {
    icon: '👩‍👩‍👦',
    name: 'family woman woman boy'
  },
  {
    icon: '👩‍👩‍👧',
    name: 'family woman woman girl'
  },
  {
    icon: '👩‍👩‍👧‍👦',
    name: 'family woman woman girl boy'
  },
  {
    icon: '👩‍👩‍👦‍👦',
    name: 'family woman woman boy boy'
  },
  {
    icon: '👩‍👩‍👧‍👧',
    name: 'family woman woman girl girl'
  },
  {
    icon: '👨‍👨‍👦',
    name: 'family man man boy'
  },
  {
    icon: '👨‍👨‍👧',
    name: 'family man man girl'
  },
  {
    icon: '👨‍👨‍👧‍👦',
    name: 'family man man girl boy'
  },
  {
    icon: '👨‍👨‍👦‍👦',
    name: 'family man man boy boy'
  },
  {
    icon: '👨‍👨‍👧‍👧',
    name: 'family man man girl girl'
  },
  {
    icon: '👩‍👦',
    name: 'family woman boy'
  },
  {
    icon: '👩‍👧',
    name: 'family woman girl'
  },
  {
    icon: '👩‍👧‍👦',
    name: 'family woman girl boy'
  }
]
