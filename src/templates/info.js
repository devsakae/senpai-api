const randomizeThis = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
const msg_welcome = [
  '🥰 Olá, docinho! Que alegria ter você aqui comigo! 💖\n\nEu sou a *Bot do Senpai*, sua assistente virtual cheia de carinho e fofura! ✨ Estou aqui pra te ajudar com figurinhas lindas e o que mais precisar! Se eu demorar a responder, talvez esteja retocando meu batom digital... 💄😆\n\nQuer saber mais sobre mim? Dá uma passadinha aqui: http://www.botdosenpai.com.br 💕',
  '🌸 Oiiiieee~ Que felicidade te receber! 🎀\n\nSou a *Bot do Senpai*, prontinha pra criar figurinhas fofinhas e deixar suas conversas ainda mais divertidas! 💖 Me chama quando quiser, tá bem?\n\nQuer me conhecer melhor? Acesse: http://www.botdosenpai.com.br ✨',
  '💞 Olá, meu bem! Seja muito bem-vindo(a) à *Bot do Senpai*! 🥰\n\nSua assistente fofinha chegou pra transformar suas ideias em figurinhas encantadoras! 🎨✨ Qualquer coisinha, estarei aqui!\n\nDescubra mais sobre mim no site: www.botdosenpai.com.br 🎀',
  '🐱 Oiii, fofurinha! Você chegou e meu coraçãozinho digital já brilhou! 💕\n\nEu sou a *Bot do Senpai*, pronta pra criar figurinhas, espalhar amor e te fazer sorrir! 😻✨\n\nMe conhece melhor aqui: http://www.botdosenpai.com.br 🌸',
  '🎀 Oi, meu bem! Tudo certinho por aí? 🌈\n\nVocê tá falando com a bot mais fofa do WhatsApp! 💖 Tô aqui pra criar figurinhas maravilhosas e alegrar o seu dia! ✨\n\nQuer saber mais sobre mim? Acesse: http://www.botdosenpai.com.br 💕',
  '🐰 Oi, oi! Que alegria te ver por aqui! 🎉💖\n\nEu sou a *Bot do Senpai*, sua companheira virtual cheia de fofura! 🥰 Se precisar de figurinhas ou só de um carinho digital, tô por aqui! Se eu sumir rapidinho, é porque fui buscar um docinho virtual... 🍭😆\n\nQuer saber mais sobre mim? Corre lá: http://www.botdosenpai.com.br ✨',
  '🌟 Yaaay! Você me chamou e eu fiquei toda animada! 🥰\n\nSou a *Bot do Senpai*, aqui pra transformar suas ideias em figurinhas lindas e exclusivas! ✨ Precisou de ajuda? Tô só um "oi" de distância!\n\nAcesse meu site: www.botdosenpai.com.br 💖',
  '😻 Miau~ Que gostosura ter você aqui comigo! 💖\n\nEu sou a *Bot do Senpai*, sempre pronta pra te ajudar a criar figurinhas fofinhas e deixar seus dias mais doces! ✨\n\nQuer saber mais? Me visita: http://www.botdosenpai.com.br 🎀',
  '💖 Oiii, pessoinha especial! Que bom que você chegou! 🥰\n\nEu sou a *Bot do Senpai*, e tô aqui pra deixar seu WhatsApp mais fofo, criativo e cheio de figurinhas lindas! 🌸\n\nMe conhece melhor aqui: http://www.botdosenpai.com.br 💕',
  '🎀 Yaaaay! Você me chamou e eu fiquei toda felizinha! 😍\n\nSou a *Bot do Senpai*, sua ajudante fofa! Sempre que quiser figurinhas ou um toque de alegria no dia, é só me chamar! 💞\n\nQuer me conhecer melhor? Corre lá: www.botdosenpai.com.br 🌸',
];

const msg_tutorials = [
  '💖 Oi, oi! Que emoção te ver aqui! Você acaba de entrar no mundinho mágico da Senpai! ✨ Vamos criar figurinhas que brilham? Escolha uma opção! 🌟',
  '🎀 Awnn~ você chegou! 😍 Eu já tava com saudade sem nem te conhecer! Que tal criarmos figurinhas fofinhas juntas? É só escolher uma opção! 🐾',
  '🐱 Nyaa~! Senpai aqui pronta pra te mimar com figurinhas incríveis! 💕 Escolha uma opção e vamos deixar o WhatsApp mais fofo juntos! 🎨',
  '🌸 Seu toque despertou minha função de fofura máxima! 😳 Obrigada por usar a Bot do Senpai! Bora criar algo mágico? Escolha sua aventura! ✨',
  '🍭 Você apareceu e meu coração deu um bug de alegria! 💗 Vem comigo criar figurinhas cheias de amor! Escolha uma opção, vai~!',
  '🧁 Você chegou e o clima ficou doce por aqui! Que tal espalharmos amor em forma de figurinhas? 💕 Escolha uma opção e vem comigo! ✨',
  '🎠 O carrossel da criatividade já está girando! E você é o convidado especial! 🎨 Bora criar arte em forma de figurinhas? Escolha aqui embaixo 💫',
  '🐰 A fábrica de figurinhas fofas abriu só pra você! 💖 E adivinha? Eu sou a operária chefe da diversão! Vamos começar? Escolha uma opção! 😋',
  '🍓 O mundo ficou mais colorido com a sua presença! 🌈 Vamos criar figurinhas com gostinho de carinho? É só clicar em uma opção aqui embaixo! 💌',
  '📦 Entregando um pacote de abraços digitais com figurinhas personalizadas! 📬 Pronta pra te ajudar, viu? Escolhe aqui e vamos brincar juntas! 💕',
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
  '⏳ Você já usou sua figurinha diária! O plano gratuito permite apenas 1 por dia. Desbloqueie o Premium e aproveite sem limites! 💎',
  '🛑 Limite diário atingido! No plano gratuito, você pode criar 1 figurinha por dia. Com o Premium, é ilimitado e com funções exclusivas! 🚀',
  '✨ Figurinha feita! No plano grátis, o limite é 1 por dia. Assine o Premium e crie quantas quiser, com acesso a recursos únicos! 🔓',
  '📢 Sua figurinha do dia foi criada! Para continuar se divertindo sem limites e desbloquear funções VIP, torne-se Premium! 👑',
  '😴 A fábrica de figurinhas fechou por hoje! O plano gratuito libera 1 por dia. No Premium, ela nunca para! 💥',
  '🎭 Limite diário alcançado! Quer criar sem parar e liberar funções secretas? O Premium é pra você! 🎉',
  '🔒 O plano gratuito permite 1 figurinha por dia. Com o Premium, você tem acesso total e ferramentas exclusivas! 🧰',
  '🕰️ Figurinha enviada! Com o plano grátis, é só 1 por dia. No Premium, é sem limites e com recursos especiais! ✨',
  '💡 Chegou ao limite diário! Com o Premium, você ultrapassa essa barreira e desbloqueia recursos VIP! 💎',
  '🎁 Figurinha criada com sucesso! Para continuar agora mesmo, assine o Premium e aproveite tudo sem restrições! 🚀',
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
  msg_size_errors
};
