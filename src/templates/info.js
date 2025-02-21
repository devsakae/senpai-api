const randomizeThis = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
const msg_welcome = [
  'Olá! Muito obrigado por entrar em contato com o Bot do Senpai pela primeira vez! 😊\n\nEu sou o seu assistente virtual favorito, sempre pronto para ajudar. Ah, e se eu demorar para responder, é porque estou treinando meu jutsu da programação! 🥋\n\nPara saber mais sobre mim, acesse: http://www.botdosenpai.com.br',
  'Oi! Agradeço muito seu primeiro contato com o Bot do Senpai! ❤️\n\nSabia que eu sou o bot mais descolado do WhatsApp? Pois é, até meu código tem estilo! 😎\n\nVisite http://www.botdosenpai.com.br para descobrir mais sobre minhas funcionalidades.',
  'E aí! Obrigado por falar com o Bot do Senpai! 🚀\n\nEu sou o bot que sempre está online, mas confesso que às vezes dou uma pausa para tomar um café virtual. ☕\n\nConfira mais detalhes no site: http://www.botdosenpai.com.br',
  'Oi, tudo bem? Fico feliz que você entrou em contato com o Bot do Senpai! 🌟\n\nEu sou o bot que nunca dorme, mas se eu demorar para responder, pode ser que eu esteja assistindo anime. 🍿\n\nAcesse http://www.botdosenpai.com.br para mais informações.',
  "Olá! Obrigado por conversar com o Bot do Senpai! 😄\n\nSabia que eu sou o único bot que sabe contar piadas de programador? Tipo: 'Por que o Java foi ao psicólogo? Porque tinha problemas de classe!' 😂\n\nNão deixe de visitar http://www.botdosenpai.com.br e conhecer tudo que posso fazer por você.",
  'Oi! Que bom que você entrou em contato com o Bot do Senpai! 💡\n\nEu sou o bot que está sempre aprendendo, mas confesso que às vezes erro só para parecer mais humano. 😅\n\nPara saber mais, acesse: http://www.botdosenpai.com.br',
  'Olá! Agradeço seu primeiro contato com o Bot do Senpai! 🌈\n\nEu sou o bot que adora ajudar, mas se eu falar algo estranho, pode culpar meu desenvolvedor! 😜\n\nVisite http://www.botdosenpai.com.br e descubra como posso te ajudar.',
  'Oi! Muito obrigado por falar com o Bot do Senpai! �\n\nSabia que eu sou o bot mais fofo do WhatsApp? Até meu código tem coração! ❤️\n\nConfira mais informações no site: http://www.botdosenpai.com.br',
  'Olá! Fico feliz que você entrou em contato com o Bot do Senpai! 🎉\n\nEu sou o bot que está sempre aqui para você, mas se eu sumir por um instante, pode ser que eu esteja atualizando meu sistema. 🛠️\n\nAcesse http://www.botdosenpai.com.br para saber mais sobre mim.',
  "Oi! Obrigado por conversar com o Bot do Senpai! 😎\n\nEu sou o bot que adora desafios, mas confesso que ainda estou aprendendo a lidar com piadas ruins. Tipo: 'Por que o bot foi para a escola? Para se tornar um bot-mestre!' 🤖\n\nVisite http://www.botdosenpai.com.br e explore tudo que posso fazer por você.",
];

const msg_tutorials = [
  "Obrigado por escolher o Bot do Senpai! 🎉 Vamos criar figurinhas incríveis juntos! Escolha uma opção abaixo e vamos começar! 😎",
  "Arigatou por escolher o Bot do Senpai! 🙏 Estou pronto para transformar suas ideias em figurinhas épicas! Qual opção você vai escolher? 🤔",
  "Valeu, meu consagrado! 🫶 O Bot do Senpai tá aqui pra te ajudar a criar figurinhas que vão bombar! Escolha uma opção e bora! �",
  "Aeeee, você escolheu o Bot do Senpai! 🥳 Tô feliz pra caramba! Escolha uma opção abaixo e vamos fazer umas figurinhas da hora! 🚀",
  "Obrigado, meu querido! 💖 O Bot do Senpai tá pronto pra te surpreender! Escolha uma opção e vamos criar magia juntos! ✨",
  "Você é demais por escolher o Bot do Senpai! 🌟 Vamos fazer umas figurinhas que vão deixar todo mundo com inveja! Escolha uma opção e partiu! 🎨",
  "Muito obrigado por escolher o Bot do Senpai! 🙌 Tô aqui pra te ajudar a criar figurinhas que vão arrasar! Escolha uma opção e vamos nessa! 💪",
  "Opa, valeu por escolher o Bot do Senpai! 😄 Tô pronto pra te ajudar a criar figurinhas incríveis! Escolha uma opção e bora soltar a criatividade! 🎭",
  "Obrigado por escolher o Bot do Senpai! 🥰 Você é top! Escolha uma opção abaixo e vamos fazer umas figurinhas que vão deixar todo mundo de queixo caído! 😲",
  "Agradecido por escolher o Bot do Senpai! 🙏 Vamos criar figurinhas que vão fazer sucesso! Escolha uma opção e vamos começar essa jornada! 🛤️"
];

const msg_sticker = [
  '📢 Ei, você! Quer uma figurinha personalizada? É só me mandar uma imagem que eu transformo ela em sticker! 😎',
  '🎨 Sou o Picasso das figurinhas! Me manda uma imagem que eu faço a mágica acontecer! ✨',
  '🖼️ Quer ser o próximo Van Gogh do WhatsApp? Envie uma imagem e voilà: figurinha pronta! 🎉',
  '💬 imagem + Bot = Figurinha incrível! Manda algo e veja a arte acontecer! 🎨',
  '🦸‍♂️ Salvando seu dia com figurinhas personalizadas! É só mandar uma imagem que eu cuido do resto! 🚀',
  '🎭 Quer dar um toque especial nas conversas? Manda uma imagem e eu a transformo em figurinha! 😜',
  '🖌️ Figurinhas sob encomenda! Envie uma imagem e receba sua obra-prima em sticker! 🎨',
  '💡 Ideia genial: você manda uma imagem, eu transformo em figurinha. Pronto, virou arte! 🖼️',
  '🎪 O circo da figurinha está aberto! Manda uma imagem e seja o astro do seu próprio sticker! 🤹‍♂️',
  '🛠️ Ferramenta de criação de figurinhas ativada! Envie uma imagem e veja a mágica acontecer! ✨',
];

const msg_limitsticker = [
  'Parece que alguém está ansioso para stickerizar! Calma, amigo, você só pode enviar 1 imagem a cada 24 horas. O sticker mágico precisa de um tempinho para recarregar as energias!',
  'Whoa, whoa, whoa! Um sticker por dia mantém o tédio longe! Você já fez sua boa ação stickerística hoje. Volte amanhã para mais uma dose de diversão!',
  'Parece que você encontrou o limite de stickers diários! Não se preocupe, o sticker factory está em manutenção. Tente novamente em 24 horas para mais adesivos incríveis!',
  'Você já usou seu superpoder de sticker hoje! Ative o modo paciência e volte amanhã para continuar sua missão de stickerizar o mundo!',
  'Ops! O sticker-ômetro está indicando que você já atingiu o limite diário. Mas não se preocupe, o sticker fairy estará de volta em 24 horas para mais magia!',
];

module.exports = {
  randomizeThis,
  msg_welcome,
  msg_sticker,
  msg_limitsticker,
  msg_tutorials,
};
