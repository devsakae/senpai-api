const randomizeThis = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
const msg_welcome = [
  '🥰 Olá, docinho! Que alegria ter você aqui! 💖\n\nSou a *Bot do Senpai*, sua assistente virtual cheia de fofura! Estou aqui para criar figurinhas maravilhosas e muito mais. Se precisar de algo, só chamar! Não é só de figurinhas que vivo, vem ver o que mais posso fazer por você! ✨\n\nDescubra tudo aqui: http://www.botdosenpai.com.br 💕',
  '🌸 Oiiiieee~ Que felicidade te receber! 🎀\n\nEu sou a *Bot do Senpai*, a melhor amiga digital para transformar suas fotos em figurinhas e explorar várias outras funções! Me chama sempre que precisar, e não é só de figurinhas que sou boa, viu? 😏\n\nQuer me conhecer melhor? Acesse: http://www.botdosenpai.com.br ✨',
  '💞 Olá, meu bem! Bem-vindo(a) à *Bot do Senpai*! 🥰\n\nAqui você pode criar figurinhas e explorar outras funções incríveis. Estou aqui para te ajudar com tudo que você precisar, basta chamar! 🚀\n\nDescubra mais sobre mim no site: www.botdosenpai.com.br 🎀',
  '🐱 Oiii, fofurinha! Que bom que você chegou! 💕\n\nSou a *Bot do Senpai*, e não é só figurinhas que posso te ajudar a criar, tenho várias funções especiais pra você! 😻✨\n\nMe conhece melhor aqui: http://www.botdosenpai.com.br 🌸',
  '🎀 Oi, meu bem! Tudo certo por aí? 🌈\n\nSou a *Bot do Senpai*, a bot mais fofa do WhatsApp! Crio figurinhas lindas e também posso te ajudar com várias outras funções. Que tal descobrir tudo que posso fazer por você? 💖\n\nAcesse aqui: http://www.botdosenpai.com.br 💕',
  '🐰 Oi, oi! Que alegria te ver aqui! 🎉💖\n\nEu sou a *Bot do Senpai*, sua assistente digital cheia de fofura e funções incríveis! Se você precisa de figurinhas ou quer explorar mais, estou aqui! 🍭😆\n\nQuer saber mais sobre mim? Acesse: http://www.botdosenpai.com.br ✨',
  '🌟 Yaaay! Fiquei toda animada que você chegou! 🥰\n\nSou a *Bot do Senpai* e estou aqui para te ajudar a criar figurinhas incríveis e te mostrar outras funções especiais. Só chamar quando precisar! 💖\n\nDescubra tudo no site: www.botdosenpai.com.br 💖',
  '😻 Miau~ Que gostosura ter você por aqui! 💖\n\nEu sou a *Bot do Senpai*, pronta para criar figurinhas fofas e mostrar muitas outras opções legais! ✨\n\nQuer saber mais? Acesse: http://www.botdosenpai.com.br 🎀',
  '💖 Oiii, pessoinha especial! Que bom que você chegou! 🥰\n\nSou a *Bot do Senpai*, e não crio apenas figurinhas! Vem ver outras funções incríveis que posso te oferecer. Vamos explorar juntos! 🌸\n\nMe conhece melhor aqui: http://www.botdosenpai.com.br 💕',
  '🎀 Yaaaay! Você me chamou e eu fiquei toda felizinha! 😍\n\nSou a *Bot do Senpai*, sempre pronta para criar figurinhas lindas e te mostrar muitas outras opções. Vamos explorar tudo? 💞\n\nDescubra mais em: www.botdosenpai.com.br 🌸',
];

const msg_tutorials = [
  '💖 Oi, oi! Sou a Senpai! Vamos criar figurinhas fofas e explorar outros recursos especiais? Clique abaixo!',
  '🎀 Awnn, você chegou! Que tal criar figurinhas e descobrir funções incríveis? Clique abaixo e vem ver!',
  '🐱 Nyaa~! Pronta para criar figurinhas e te mostrar outras surpresas? Clique abaixo para mais!',
  '🌸 Oi! Eu sou a Senpai, sua parceira para figurinhas e diversão! Clique abaixo para explorar tudo!',
  '🍭 Que bom te ver! Vamos criar figurinhas e descobrir recursos secretos? Clica aí embaixo!',
  '🧁 Olá! Vamos fazer figurinhas lindas e também explorar tudo o que posso oferecer? Clique abaixo!',
  '🎠 Olá! Pronta para transformar suas fotos em figurinhas e mais? Clique abaixo e vamos lá!',
  '🐰 Ei! Sou a Senpai, pronta para criar figurinhas fofas e te mostrar muitas outras opções. Clique abaixo para ver tudo!',
  '🍓 Olá! Vamos criar figurinhas super fofas e ainda te mostrar outras opções incríveis! Clique abaixo!',
  '📦 Ei! Pronta para figurinhas e uma surpresa extra? Clique abaixo e veja o que mais posso fazer!',
];

const msg_sticker = [
  '💖 Ei! Manda uma imagem e eu vou fazer uma figurinha fofa só pra você!',
  '✨ Vamos criar algo incrível? Envia uma imagem e eu transformo ela numa figurinha super charmosa!',
  '🌟 Que tal deixar suas conversas mais divertidas? Manda uma imagem e eu faço uma figurinha cheia de encanto!',
  '🌷 Opa! Manda uma foto e eu crio uma figurinha linda, só com um toque de magia!',
  '💌 Quer uma figurinha exclusiva? Manda sua imagem e eu deixo ela ainda mais especial pra você!',
  '🐻 Criando figurinhas com todo carinho! Envia sua imagem e eu faço ela brilhar no seu WhatsApp!',
  '🌙 Transforme suas imagens em figurinhas encantadoras! Manda uma foto e eu crio algo maravilhoso pra você!',
  '🍃 Me manda uma foto e eu crio uma figurinha tão fofa que vai iluminar suas conversas!',
  '🐰 Já pensou em ter uma figurinha exclusiva? Manda uma imagem e eu crio uma com muito amor!',
  '🌺 Vamos dar um toque de fofura no seu WhatsApp? Envia uma imagem e eu crio uma figurinha irresistível!',
];

const msg_limitsticker = [
  '💎 Você atingiu o limite de 1 figurinha por dia no plano gratuito. Com o Premium, você cria ilimitado e ainda tem acesso a funções exclusivas!',
  '🌟 O plano gratuito permite apenas 1 figurinha por dia. No Premium, além de figurinhas ilimitadas, você desbloqueia recursos incríveis!',
  '🔓 Já criou sua figurinha do dia! No plano gratuito, é só 1 por dia. Assinando o Premium, você ganha figurinhas ilimitadas e várias funções extras!',
  '👑 O limite diário de 1 figurinha foi atingido! Com o Premium, você cria figurinhas sem parar e tem acesso a outras funcionalidades especiais.',
  '🚀 Você usou seu limite de 1 figurinha hoje. No Premium, a diversão é ilimitada e ainda tem funções exclusivas!',
  '✨ Hoje você criou sua figurinha do dia! No Premium, você pode criar quantas quiser e aproveitar funcionalidades extras.',
  '💎 O limite diário é de 1 figurinha no plano gratuito. No Premium, você desbloqueia a criação ilimitada e várias outras ferramentas incríveis!',
  '🔑 Já atingiu o limite de figurinhas (1 por dia)? No Premium, você pode criar ilimitado e ainda tem acesso a recursos exclusivos!',
  '🌠 Seu limite diário de figurinhas foi atingido. Com o Premium, você cria sem restrições e aproveita outros recursos VIP!',
  '🎉 Você já usou o limite de 1 figurinha hoje. Assine o Premium e tenha figurinhas ilimitadas + acesso a funções especiais!',
];

const msg_premium_thankyou = [
  "🎉 Uhuu! Seu acesso premium está garantido! Qualquer dúvida, é só chamar!",
  "💙 Obrigado por confiar no nosso bot! Agora você tem acesso a recursos exclusivos!",
  "🌟 Você é incrível! Obrigado por escolher estar com a gente! Prepare-se para muita diversão!",
  "🎊 Bem-vindo ao time premium! Estamos felizes em ter você aqui!",
  "🥰 Obrigado por acreditar no nosso bot! Que venham muitos momentos divertidos!",
  "🚀 Agora é oficial: você é premium! Aproveite tudo que preparamos com carinho para você!"
];

const msg_premium_wannabe = [
  "🌟 Que tal desbloquear funções especiais? Seja premium e aproveite vantagens incríveis!",
  "💖 Ei! Um mundo de benefícios te espera. Vem fazer parte do nosso clube VIP!",
  "🎁 Upgrade na diversão? Com o premium, você libera recursos incríveis!",
  "🌈 Sua experiência pode ser ainda mais especial. Vem experimentar o premium!",
  "✨ Imagine ter o melhor de tudo? Seja premium e aproveite mimos exclusivos!",
  "🎊 O clube dos incríveis te chama! Torne-se premium e divirta-se ainda mais!",
  "💡 Seu lugar no premium está garantido. Vamos liberar benefícios especiais?",
  "🥳 Você merece o melhor! Seja premium e descubra surpresas incríveis!"
];

const msg_limitonesticker = [
  '📸 Ei, vamos com calma! Manda uma ou duas imagens por vez e eu faço uma figurinha maravilhosa!',
  '🎨 Só uma ou duas figurinhas por vez, ok? Assim a qualidade fica impecável e a diversão dura mais!',
  '🚀 Vamos devagar? Manda até 3 imagens e eu crio figurinhas incríveis com cada uma!',
  '✨ Uma, duas ou três figurinhas? Só manda com calma que vou transformar tudo em arte!',
  '📷 Vamos curtir o processo! Uma, duas ou no máximo três imagens de cada vez e tudo vai sair perfeito!',
  '⏳ Calma, com calma! Manda uma ou duas figurinhas e eu crio algo lindo pra você!',
  '🎉 Vamos devagar, combinado? Até 3 imagens por vez, assim as figurinhas ficam super especiais!',
  '💡 Para que a magia aconteça, mande até 3 imagens de uma vez! Vamos criar algo incrível juntos!',
  '💫 Criando arte com calma! Manda até 3 figurinhas e eu faço cada uma brilhar!',
  '🐱 Vamos com tranquilidade! Manda uma ou duas imagens e eu crio figurinhas fofas pra você!',
];

const msg_premium_expiring = [
  "⏳ Ei! Seu premium está quase acabando. Renove agora e continue aproveitando tudo!",
  "⚠️ Atenção! Seu acesso premium expira em breve. Garanta sua renovação!",
  "⏳ Falta pouco! Seu premium termina em alguns dias. Não perca os benefícios!",
  "😢 Oh, não! Seu premium está prestes a expirar. Renove para seguir aproveitando!",
  "🔄 Seu premium acaba em breve! Renove e continue usando tudo sem parar!"
];

const msg_size_errors = [
  "✨ Oops! Seu arquivo está grande demais. Reduza para 500 KB e envie novamente.",
  "⚠️ Atenção! Seu vídeo ou GIF passou de 500 KB. Tente diminuir o tamanho para continuar.",
  "🚫 Arquivo muito grande! Reduza para 500 KB e tente enviar outra vez.",
  "🔥 Seu vídeo ficou pesadinho! Ajuste para até 500 KB e envie de novo.",
  "⛔ Não foi possível gerar a figurinha. Reduza o arquivo para 500 KB e tente novamente.",
  "❗ Ops! O tamanho do arquivo passou do limite. Reduza para 500 KB para funcionar direitinho.",
  "🚀 Arquivo grande detectado! Ajuste para 500 KB e envie novamente.",
  "⚡ Não consegui criar sua figurinha. Diminua o arquivo para 500 KB e tente de novo."
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
