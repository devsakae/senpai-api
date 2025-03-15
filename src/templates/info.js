const randomizeThis = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
const msg_welcome = [
  '🥰 Olá, docinho! Que alegria te ver por aqui! 💖\n\nEu sou a SenpaiBot, sua assistente fofa e cheia de carinho! ✨ Estou aqui para te ajudar com figurinhas e o que mais precisar! Se eu demorar a responder, talvez eu esteja retocando meu batom digital... 💄😆\n\nQuer saber mais sobre mim? Dá uma olhadinha aqui: http://www.botdosenpai.com.br 💕',
  '🌸 Oiiie! Que felicidade ter você por aqui! 🎀\n\nSou a SenpaiBot, sempre pronta para te ajudar a criar figurinhas e deixar suas conversas ainda mais divertidas! 💖 Me chama sempre que precisar, viu?\n\nSe quiser me conhecer melhor, acesse: http://www.botdosenpai.com.br ✨',
  '💞 Olá, meu bem! Seja muito bem-vindo(a) à SenpaiBot! 🥰\n\nSou sua assistente virtual fofinha e estou aqui para transformar suas ideias em figurinhas lindas! 🎨✨ Qualquer coisa, é só me chamar!\n\nQuer saber mais sobre mim? Acesse: www.botdosenpai.com.br 🎀',
  '🐱 Oiii, fofinho(a)! Você chegou e meu coraçãozinho digital já ficou feliz! 💕\n\nEu sou a SenpaiBot, e estou aqui para criar figurinhas, espalhar amor e te fazer sorrir! 😻✨\n\nDá uma passadinha no meu site para saber mais sobre mim: http://www.botdosenpai.com.br 🌸',
  '🎀 Oi, meu bem! Tudo certinho? 🌈\n\nVocê acabou de falar com a bot mais fofa do WhatsApp! 💖 Estou sempre aqui para criar figurinhas lindas e alegrar o seu dia! ✨\n\nSe quiser me conhecer melhor, acesse: http://www.botdosenpai.com.br 💕',
  '🐰 Oi, oi! Que bom que você chegou! 🎉💖\n\nEu sou a SenpaiBot, sua amiga virtual cheia de fofura! 🥰 Se precisar de figurinhas ou de um papo animado, estou por aqui! Se eu sumir rapidinho, é porque fui pegar um docinho virtual... 🍭😆\n\nQuer saber mais sobre mim? Acesse: http://www.botdosenpai.com.br ✨',
  '🌟 Yay! Você me chamou e eu já fiquei toda animada! 🥰\n\nSou a SenpaiBot, e estou aqui para transformar suas ideias em figurinhas incríveis! ✨ Qualquer dúvida ou ajuda, pode contar comigo!\n\nAcesse meu site para saber mais sobre mim: www.botdosenpai.com.br 💖',
  '😻 Miau! Que delícia te ver aqui! 💖\n\nEu sou a SenpaiBot, sempre pronta para te ajudar a criar figurinhas maravilhosas! ✨ Se precisar de algo, é só me chamar, viu?\n\nSe quiser saber mais sobre mim, acesse: http://www.botdosenpai.com.br 🎀',
  '💖 Oiii, pessoa especial! Que bom que você chegou! 🥰\n\nEu sou a SenpaiBot e estou aqui para deixar seu WhatsApp ainda mais fofo e divertido! 🌸\n\nSe quiser saber mais sobre mim, dá uma passadinha no meu site: http://www.botdosenpai.com.br 💕',
  '🎀 Yaaaay! Você me chamou e eu já estou toda feliz! 😍\n\nSou a SenpaiBot, sua assistente fofinha! Sempre que precisar de figurinhas ou de um toque de alegria no seu dia, é só me chamar! 💞\n\nQuer me conhecer melhor? Acesse: www.botdosenpai.com.br 🌸',
];

const msg_tutorials = [
  '💖 Owwwn, que alegria te ver aqui! Obrigado por usar o Bot do Senpai! 🥰 Vamos criar figurinhas lindas juntos? Escolha uma opção abaixo! ✨',
  '🐱 Arigatooo~! 💕 Você é um amor por usar o Bot do Senpai! Vamos fazer figurinhas incríveis? Escolha uma opção e bora! 😍',
  '🥺 O Senpai tá muito feliz de ter você aqui! Obrigado por confiar em mim! 💝 Vamos criar figurinhas mágicas juntos? ✨ Escolha uma opção!',
  '🌸 O seu sorriso vale mais do que mil figurinhas! 😻 Obrigado por usar o Bot do Senpai! Vamos criar algo lindo? Escolha uma opção abaixo! 🥳',
  '😚 Obrigado, docinho! Você faz meu dia mais feliz só por estar aqui! 💞 Bora criar figurinhas maravilhosas? Escolha uma opção e vamos nessa! 🚀',
  '🐰 Seu carinho ilumina meu código! 💡✨ Obrigado por usar o Bot do Senpai! Escolha uma opção e vamos transformar amor em figurinhas! 🥰',
  '🎀 Awwn, você escolheu o Bot do Senpai! 💖 Eu tô super empolgado para fazer figurinhas incríveis com você! Escolha uma opção e bora lá! 🥳',
  '💞 Você é um serzinho especial! Obrigado por usar o Bot do Senpai! 🥺 Vamos criar figurinhas cheias de amor? Escolha uma opção abaixo! 🌟',
  '🐶 Eu queria te dar um abraço de gratidão! 🤗 Obrigado por estar aqui! Vamos criar figurinhas fofinhas juntos? Escolha uma opção! 🎨💖',
  '🍭 Você é um docinho! Obrigado por escolher o Bot do Senpai! 💕 Estou pronto para criar figurinhas encantadoras com você! Escolha uma opção! ✨',
];

const msg_sticker = [
  '✨ Ei, docinho! Me manda uma imagem e eu transformo ela em uma figurinha super fofinha para você! 💖',
  '🎨 Quer uma figurinha personalizada e cheia de estilo? Envia uma imagem e deixa comigo! ✨',
  '📸 Uma foto + um toque de magia = sua figurinha perfeita! Manda aí e eu faço o resto! 🥰',
  '🐰 Opa! Tá na hora de deixar suas conversas mais divertidas! Me manda uma imagem e eu faço uma figurinha bem linda! 💕',
  '🖌️ Criando figurinhas com amor! Manda sua imagem e eu faço ela brilhar no seu WhatsApp! 🌟',
  '🎭 Suas conversas merecem um toque especial! Envia uma imagem e eu crio uma figurinha incrível para você! 😍',
  '💡 Ideia brilhante: você manda uma imagem, e eu transformo ela em uma figurinha que vai arrasar! ✨',
  '🐱 Prrr... Eu adoro criar figurinhas! Envie uma imagem e veja a mágica acontecer! 🎀',
  '🌈 Transformando suas imagens em figurinhas cheias de cor e alegria! Envie uma e veja o resultado! 🥳',
  '🌟 Tá pronto(a) para ter a figurinha mais linda do WhatsApp? Manda uma imagem e eu faço ela para você! 💖',
];

const msg_limitsticker = [
  '⏳ Ei, calma aí, artista das figurinhas! 🎨 Você já criou seu sticker hoje! Mas não se preocupe, o encanto recarrega em 24 horas! 💖',
  '🛑 Opa, opa! O motorzinho das figurinhas precisa de um descanso! 😴 Volte amanhã para criar mais adesivos incríveis! ✨',
  '✨ Parece que você atingiu o limite de figurinhas mágicas do dia! 🦄 Mas não se preocupe, amanhã a fábrica abre de novo! 🎠',
  '📢 Atenção, mestre das figurinhas! 📸 Você já usou seu poder máximo de hoje! Mas amanhã você pode voltar com tudo! 💪🔥',
  '🕰️ O sticker mágico precisa descansar um pouquinho! 😴 Volte amanhã e continue espalhando diversão com suas figurinhas! 🥰',
  '🎭 O palco das figurinhas está fechado por hoje! 🏰 Mas amanhã você pode brilhar de novo com novas criações! 🌟',
  '💡 Ufa! Você criou tantas figurinhas que até meu sistema ficou impressionado! 🤯 Volte amanhã para mais diversão! 😍',
  '🌟 Sticker factory fechada por hoje! 🏭 Mas amanhã tem reabertura com muitas criações novas! Fique de olho! 👀',
  '🚀 Pouso forçado! Você já usou seu limite de figurinhas hoje! 🛸 Mas amanhã a viagem continua, então fique pronto! 💫',
  '🎀 Sua criatividade é incrível! Mas agora, um tempinho de descanso para o sistema! Volte amanhã para mais figurinhas fofas! 💕',
];

const msg_premium_thankyou = [
  'Uhuu! 🎉 Seu acesso está garantido! Qualquer dúvida, é só chamar. 🚀',
  'Obrigado por escolher nosso bot! 💙 Agora você tem acesso a recursos exclusivos.',
  'Você é incrível! 💙 Obrigado por confiar em nós. Prepare-se para muita diversão! 😍',
  'Bem-vindo! 🎊 Estamos felizes por ter você aqui. Qualquer coisa, estamos a um comando de distância! 😉',
  'Ei, você! Sim, você! 🥰 Obrigado por escolher nosso bot! Espero que ele traga muitas risadas e diversão para você! 🎭',
  'Agora é oficial: você é premium! 🎊 Obrigado por estar aqui! Aproveite tudo o que preparamos com carinho para você. 💖',
];

const msg_premium_wannabe = [
  '🌟 Que tal desbloquear poderes especiais? Como premium, você tem acesso a vantagens exclusivas e uma experiência mágica! ✨ Vem com a gente! 🚀',
  '💖 Ei, você! Sabia que tem um mundo de benefícios te esperando? Ser premium é ter acesso ao melhor! Vem fazer parte do nosso clube VIP! 🎉',
  '🎁 Upgrade na diversão? SIM! 😍 Como premium, você desbloqueia recursos incríveis e aproveita tudo ao máximo. Vamos juntos nessa? 🚀',
  '🌈 Sua experiência pode ficar ainda mais especial! Com o plano premium, você ganha vantagens únicas e exclusivas. Que tal experimentar? 💙',
  '✨ Imagina ter o melhor de nós, sempre? Como premium, você recebe mimos, benefícios e uma experiência personalizada! 💖 Não perca essa chance!',
  '🎊 O clube dos incríveis está te esperando! Como premium, você terá acesso a recursos especiais e muito mais diversão! 🥰 Vem com a gente!',
  '💡 Seu lugar no time premium está garantido! 🚀 Benefícios exclusivos, suporte especial e muito mais esperam por você. Vamos nessa? 😍',
  '🥳 Você merece o melhor! E como premium, sua experiência será ainda mais divertida e cheia de surpresas! 🌟 Vem descobrir tudo com a gente!',
];

const msg_limitonesticker = [
  '📸 Ei, calma! Uma imagem de cada vez, assim a mágica acontece direitinho! ✨',
  '🎭 Nada de maratona de figurinhas! Envie uma por vez e aproveite cada criação! 😉',
  '📷 Uma figurinha por vez, combinado? Assim a diversão dura mais tempo! 🎉',
  '🎨 Criatividade com calma! Manda só uma imagem de cada vez e eu faço arte! 🖌️✨',
  '🚀 Qualidade em primeiro lugar! Uma imagem de cada vez e sua figurinha fica perfeita! 💖',
  '⏳ Sem pressa! Envie uma imagem de cada vez e veja sua figurinha nascer com carinho! 🥰',
  '😜 Eu sei que é viciante, mas vamos com calma! Uma imagem por vez, por favor!',
  '🥳 O segredo da figurinha perfeita? Enviar uma de cada vez! Confia em mim! 😉',
  '💡 Mais vale uma figurinha bem feita do que um monte de qualquer jeito! Vamos devagar! 🚀',
  '🖼️ O processo é simples: uma imagem, uma figurinha, muita diversão! Bora? 💕',
];

const msg_premium_expiring = [
  'Ei! ⏳ Seu premium está quase acabando! Renove agora e continue aproveitando todas as vantagens. 🚀',
  'Aviso rápido! ⚠️ Seu acesso premium expira em breve. Não fique sem seus benefícios, renove agora! 💙',
  'Falta pouco! ⏳ Seu premium termina em alguns dias. Garanta sua renovação e continue se divertindo! 😃',
  'Oh, não! 😢 Seu premium está prestes a expirar. Quer continuar com os recursos exclusivos? Renove já! 🔥',
  'Atenção! Seu premium acaba em breve! 🔄 Renove agora para continuar aproveitando tudo sem interrupções! ✨',
];

const msg_bom_dia = [
  "Que seu dia seja brilhante como o sol! ☀️",
  "Hoje é um novo dia para ser incrível! 🌟",
  "Que a paz e o amor guiem seu dia! 💖",
  "Desperte com um sorriso no rosto! 😊",
  "Que a alegria esteja com você hoje e sempre! 🎉",
  "Aproveite cada momento deste novo dia! 🌈",
  "Que seu dia seja leve e cheio de boas energias! 🌿",
  "Hoje é um ótimo dia para ser feliz! 😄",
  "Que seu coração esteja cheio de gratidão! ❤️",
  "Que a luz do sol ilumine seu caminho! 🌞",
  "Que seu dia seja tão especial quanto você! 🌸",
  "Acredite no poder de um novo começo! 🌱",
  "Que seu dia seja repleto de sorrisos! 😁",
  "Hoje é um dia para conquistar seus sonhos! 🚀",
  "Que a felicidade bata à sua porta! 🏡",
  "Que seu dia seja cheio de amor e paz! 💕",
  "Desperte com o coração cheio de esperança! 🌻",
  "Que seu dia seja tão brilhante quanto você! ✨",
  "Hoje é um dia para ser grato e feliz! 🙏",
  "Que seu dia seja cheio de pequenas alegrias! 🎈",
  "Que a energia positiva esteja com você! 🔋",
  "Hoje é um dia para espalhar amor e bondade! 💝",
  "Que seu dia seja tão doce quanto você! 🍯",
  "Que a paz esteja com você hoje e sempre! 🕊️",
  "Hoje é um dia para brilhar! 🌟",
  "Que seu dia seja cheio de boas surpresas! 🎁",
  "Que a felicidade esteja em cada detalhe do seu dia! 😊",
  "Hoje é um dia para ser incrível! 🌈",
  "Que seu dia seja cheio de amor e luz! 💡",
  "Que seu dia seja tão especial quanto você! 🌸",
  "Hoje é um dia para ser grato e feliz! 🙏",
  "Que seu dia seja cheio de pequenas alegrias! 🎈",
  "Que a energia positiva esteja com você! 🔋",
  "Hoje é um dia para espalhar amor e bondade! 💝",
  "Que seu dia seja tão doce quanto você! 🍯",
  "Que a paz esteja com você hoje e sempre! 🕊️",
  "Hoje é um dia para brilhar! 🌟",
  "Que seu dia seja cheio de boas surpresas! 🎁",
  "Que a felicidade esteja em cada detalhe do seu dia! 😊",
  "Hoje é um dia para ser incrível! 🌈",
  "Que seu dia seja cheio de amor e luz! 💡",
  "Que seu dia seja tão especial quanto você! 🌸",
  "Hoje é um dia para ser grato e feliz! 🙏",
  "Que seu dia seja cheio de pequenas alegrias! 🎈",
  "Que a energia positiva esteja com você! 🔋",
  "Hoje é um dia para espalhar amor e bondade! 💝",
  "Que seu dia seja tão doce quanto você! 🍯",
  "Que a paz esteja com você hoje e sempre! 🕊️",
  "Hoje é um dia para brilhar! 🌟",
  "Que seu dia seja cheio de boas surpresas! 🎁"
];

const msg_size_errors = [
  "✨ Oops! O arquivo está um pouquinho grande demais. Tente reduzir o tamanho para 500 KB e envie novamente. 😊",
  "⚠️ Atenção! O vídeo ou GIF ultrapassou o limite de 500 KB. Que tal tentar reduzir o tamanho do arquivo para continuar? 🎥✨",
  "🚫 Ops! Não conseguimos transformar o arquivo em figurinha. O arquivo está grande demais! Tente reduzir para 500 KB e envie de novo. 💡",
  "🔥 Ei, seu vídeo está muito grande! Para criar a figurinha, reduza o tamanho para 500 KB e tente novamente. 😉💥",
  "⛔ Erro ao gerar a figurinha. O arquivo está acima do limite de 500 KB. Reduza o tamanho para que funcione direitinho. 🎬🔧",
  "❗ Atenção! O arquivo não está no tamanho certo. Reduza para 500 KB e tente novamente! 🎥💖",
  "🚀 Seu vídeo ou GIF está pesadinho! Reduza o tamanho para 500 KB e tente enviar de novo! 🚀💫",
  "⚡ Não conseguimos gerar a figurinha. O arquivo está grande demais! Reduza para 500 KB e tente novamente. ✂️🔽"
];


module.exports = {
  randomizeThis,
  msg_welcome,
  msg_sticker,
  msg_limitsticker,
  msg_tutorials,
  msg_premium_thankyou,
  msg_premium_wannabe,
  msg_premium_expiring,
  msg_limitonesticker,
  msg_bom_dia,
  msg_size_errors
};
