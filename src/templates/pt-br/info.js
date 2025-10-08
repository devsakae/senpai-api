const randomizeThis = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
const msg_welcome = [
  '🥰 Olá, docinho! Que alegria ter você aqui comigo!\n\nEu sou a *Bot do Senpai*, sua assistente virtual cheia de carinho e fofura! Estou aqui pra te ajudar com figurinhas lindas e o que mais precisar! Se eu demorar a responder, talvez esteja retocando meu batom digital... 😆\n\nQuer saber mais sobre mim? Dá uma passadinha aqui: http://www.botdosenpai.com.br',
  '🌸 Oiiiieee~ Que felicidade te receber!\n\nSou a *Bot do Senpai*, prontinha pra criar figurinhas fofinhas e deixar suas conversas ainda mais divertidas! Me chama quando quiser, tá bem?\n\nQuer me conhecer melhor? Acesse: http://www.botdosenpai.com.br',
  '💞 Olá, meu bem! Seja muito bem-vindo(a) à *Bot do Senpai*!\n\nSua assistente fofinha chegou pra transformar suas ideias em figurinhas encantadoras! Qualquer coisinha, estarei aqui!\n\nDescubra mais sobre mim no site: www.botdosenpai.com.br',
  '🐱 Oiii, fofurinha! Você chegou e meu coraçãozinho digital já brilhou!\n\nEu sou a *Bot do Senpai*, pronta pra criar figurinhas, espalhar amor e te fazer sorrir!\n\nMe conhece melhor aqui: http://www.botdosenpai.com.br',
  '🎀 Oi, meu bem! Tudo certinho por aí?\n\nVocê tá falando com a bot mais fofa do WhatsApp! Tô aqui pra criar figurinhas maravilhosas e alegrar o seu dia!\n\nQuer saber mais sobre mim? Acesse: http://www.botdosenpai.com.br',
  '🐰 Oi, oi! Que alegria te ver por aqui!\n\nEu sou a *Bot do Senpai*, sua companheira virtual cheia de fofura! Se precisar de figurinhas ou só de um carinho digital, tô por aqui! Se eu sumir rapidinho, é porque fui buscar um docinho virtual... 😆\n\nQuer saber mais sobre mim? Corre lá: http://www.botdosenpai.com.br',
  '🌟 Yaaay! Você me chamou e eu fiquei toda animada!\n\nSou a *Bot do Senpai*, aqui pra transformar suas ideias em figurinhas lindas e exclusivas! Precisou de ajuda? Tô só um "oi" de distância!\n\nAcesse meu site: www.botdosenpai.com.br',
  '😻 Miau~ Que gostosura ter você aqui comigo!\n\nEu sou a *Bot do Senpai*, sempre pronta pra te ajudar a criar figurinhas fofinhas e deixar seus dias mais doces!\n\nQuer saber mais? Me visita: http://www.botdosenpai.com.br',
  '💖 Oiii, pessoinha especial! Que bom que você chegou!\n\nEu sou a *Bot do Senpai*, e tô aqui pra deixar seu WhatsApp mais fofo, criativo e cheio de figurinhas lindas!\n\nMe conhece melhor aqui: http://www.botdosenpai.com.br',
  '🎀 Yaaaay! Você me chamou e eu fiquei toda felizinha!\n\nSou a *Bot do Senpai*, sua ajudante fofa! Sempre que quiser figurinhas ou um toque de alegria no dia, é só me chamar!\n\nQuer me conhecer melhor? Corre lá: www.botdosenpai.com.br',
];

const msg_tutorials = [
  '🌷 Olá, florzinha! Que alegria ter você aqui no cantinho da Senpai! Vamos criar figurinhas incríveis? Escolha uma opção e bora!',
  '🐥 Ei, você chegou! Vamos fazer figurinhas fofinhas e divertidas juntos? Escolha uma opção e comece a mágica!',
  '🌼 Senpai está pronta para te ajudar a espalhar amor com figurinhas! Escolha sua opção favorita e vamos começar!',
  '🍬 Você acabou de entrar na terra das figurinhas doces! Escolha uma opção e vamos adoçar seu WhatsApp!',
  '🎈 Que bom que veio! Prepare-se para criar figurinhas que encantam! Escolha uma opção e vamos lá!',
  '🐾 O mundo das figurinhas fofas está te esperando! Escolha uma opção e vamos deixar tudo mais alegre!',
  '🦄 Seja bem-vindo(a) à fábrica mágica de figurinhas! Escolha uma opção e crie arte com a gente!',
  '🍒 Você chegou e trouxe energia boa! Vamos criar figurinhas incríveis? Escolha sua opção e vamos nessa!',
  '🎀 Senpai aqui, pronta pra te ajudar a criar figurinhas que encantam! Escolha uma opção e comece a diversão!',
  '💫 O universo das figurinhas te chama! Escolha uma opção e vamos criar juntos algo maravilhoso!',
];

const msg_sticker = [
  '✨ Ei, docinho! Me manda uma imagem e eu transformo ela em uma figurinha super fofinha para você!',
  '🎨 Quer uma figurinha personalizada e cheia de estilo? Envia uma imagem e deixa comigo!',
  '📸 Uma foto + um toque de magia = sua figurinha perfeita! Manda aí e eu faço o resto!',
  '🐰 Opa! Tá na hora de deixar suas conversas mais divertidas! Me manda uma imagem e eu faço uma figurinha bem linda!',
  '🖌️ Criando figurinhas com amor! Manda sua imagem e eu faço ela brilhar no seu WhatsApp!',
  '🎭 Suas conversas merecem um toque especial! Envia uma imagem e eu crio uma figurinha incrível para você!',
  '💡 Ideia brilhante: você manda uma imagem, e eu transformo ela em uma figurinha que vai arrasar!',
  '🐱 Prrr... Eu adoro criar figurinhas! Envie uma imagem e veja a mágica acontecer!',
  '🌈 Transformando suas imagens em figurinhas cheias de cor e alegria! Envie uma e veja o resultado!',
  '🌟 Tá pronto(a) para ter a figurinha mais linda do WhatsApp? Manda uma imagem e eu faço ela para você!',
];

const msg_limitsticker = [
  '⏰ Ops! Você só pode criar uma figurinha a cada 12h! Assine o *VIP* e crie quantas quiser sem esperar!',
  '🚫 Limite atingido! Só é permitido 1 figurinha a cada 12h. Torne-se VIP e crie sem limites!',
  '🌟 Figurinha diária já feita! No *VIP*, você pode criar novas figurinhas a qualquer hora, sem restrições!',
  '📣 Ei! Você só pode criar uma figurinha a cada 12h. Assine o *VIP* e continue criando sem parar!',
  '😴 Limite diário atingido! No *VIP*, figurinhas ilimitadas e vantagens exclusivas esperam por você!',
  '🎉 Você só pode criar uma figurinha a cada 12h! Assine o *VIP* e desbloqueie figurinhas ilimitadas!',
  '🔐 Limite de 12h entre figurinhas atingido! Torne-se VIP e crie quantas quiser, quando quiser!',
  '⌛ Você precisa esperar 12h para a próxima figurinha. Com o *VIP*, esse limite desaparece!',
  '💎 Figurinha criada! Próxima disponível só daqui a 12h. No VIP, você cria sem restrições!',
  '🎁 Só é possível criar 1 figurinha a cada 12h! Assine o *VIP* e crie quantas quiser!',
  '🔥 Figurinha do dia feita! Seja VIP e nunca mais se preocupe com o intervalo de 12h!',
  '⚡ Limite de 12h atingido! No *VIP*, você cria figurinhas ilimitadas e aproveita super vantagens!',
  '💌 Você só pode criar uma figurinha a cada 12h! Torne-se VIP e continue se divertindo sem limites!',
];

const msg_premium_thankyou = [
  '🎉 Uhuu! Seu acesso está garantido! Qualquer dúvida, é só chamar.',
  '💙 Obrigado por escolher nosso bot! Agora você tem acesso a recursos exclusivos.',
  '💙 Você é incrível! Obrigado por confiar em nós. Prepare-se para muita diversão!',
  '🎊 Bem-vindo! Estamos felizes por ter você aqui. Qualquer coisa, estamos a um comando de distância!',
  '🥰 Ei, você! Sim, você! Obrigado por escolher nosso bot! Espero que ele traga muitas risadas e diversão para você!',
  '🎊 Agora é oficial: você é premium! Obrigado por estar aqui! Aproveite tudo o que preparamos com carinho para você.',
];

const msg_premium_wannabe = [
  '💎 Torne-se VIP e desbloqueie figurinhas ilimitadas! Aproveite vantagens exclusivas e recursos que só os VIPs têm!',
  '🌟 Seja VIP e tenha acesso a benefícios especiais: figurinhas ilimitadas, conteúdos exclusivos e diversão sem limites!',
  '🎁 VIP é mais que um status: é figurinhas ilimitadas, recursos extras e privilégios exclusivos só para você!',
  '⚡ Quer criar figurinhas sem esperar 12h? Torne-se VIP e aproveite figurinhas ilimitadas e super vantagens!',
  '🔥 VIPs não têm limites! Crie figurinhas ilimitadas, desbloqueie recursos exclusivos e curta tudo sem restrições!',
  '🎊 Seu lugar é VIP! Desbloqueie figurinhas ilimitadas, aproveite vantagens especiais e experimente o melhor do nosso mundo!',
  '✨ Seja VIP e tenha uma experiência completa: figurinhas ilimitadas, recursos premium e muito mais diversão!',
  '💡 VIP significa acesso total: crie sem limites, aproveite benefícios exclusivos e domine o mundo das figurinhas!',
  '🥳 Torne-se VIP e transforme sua experiência: figurinhas ilimitadas, recursos extras e privilégios únicos!',
  '📣 Quer continuar criando sem limites? Seja VIP e desbloqueie figurinhas ilimitadas com vantagens especiais!',
];

const msg_limitonesticker = [
  '🎉 Ei, devagarzinho! Só pode enviar 1 ou 2 figurinhas por vez pra garantir a qualidade!',
  '⚡ Calma aí! Envie até 2 figurinhas por vez e deixe a mágica rolar!',
  '🎈 Manda 1 ou 2 figurinhas por vez, combinado? Assim todo mundo se diverte melhor!',
  '🌟 Menos é mais! Só 1 ou 2 figurinhas por vez pra ficar perfeito!',
  '🔥 Um pouquinho de paciência: só 1 ou 2 figurinhas por vez, tá bom?',
  '✨ Que tal enviar só 1 ou 2 figurinhas por vez? O resultado vai te surpreender!',
  '💫 Devagar com o gatilho! Só 1 ou 2 figurinhas por vez, pra magia funcionar!',
  '🎨 Crie com calma: envie até 2 figurinhas por vez e faça arte!',
  '💥 Pique certo! Só 1 ou 2 figurinhas por vez para brilhar no Whats!',
  '🎀 Vamos com calma! 1 ou 2 figurinhas por vez garantem diversão sem erro!',
];

const msg_premium_expiring = [
  '⏳ Ei! Seu VIP está quase acabando! Renove agora e continue aproveitando todas as vantagens sem interrupções.',
  '⚠️ Aviso importante! Seu acesso premium vai expirar em breve. Não perca seus benefícios, renove já!',
  '⏳ Quase lá! Seu VIP termina em alguns dias. Garanta a renovação e continue se divertindo sem limites!',
  '😢 Ops! Seu premium está prestes a expirar. Quer continuar com recursos exclusivos? Renove agora!',
  '🔄 Atenção! Seu VIP vai acabar em breve! Renove já e continue aproveitando figurinhas ilimitadas e muito mais!',
  '🔥 VIP expirando! Não fique sem seus benefícios. Renove agora e continue criando sem limites!',
  '💎 Seu acesso premium está acabando! Garanta a renovação e mantenha todos os recursos especiais ativos!',
  '⚡ Última chamada! Seu VIP expira em breve. Renove já e continue aproveitando vantagens exclusivas!',
  '🎁 VIP quase no fim! Não perca seus benefícios, renove agora e continue aproveitando tudo!',
  '⏰ Corra! Seu premium vai expirar em breve. Renove agora e continue se divertindo sem interrupções!',
];

const msg_size_errors = [
  "✨ Oops! O arquivo está um pouquinho grande demais. Tente reduzir o tamanho para 500 KB e envie novamente.",
  "⚠️ Atenção! O vídeo ou GIF ultrapassou o limite de 500 KB. Que tal tentar reduzir o tamanho do arquivo para continuar?",
  "🚫 Ops! Não conseguimos transformar o arquivo em figurinha. O arquivo está grande demais! Tente reduzir para 500 KB e envie de novo.",
  "🔥 Ei, seu vídeo está muito grande! Para criar a figurinha, reduza o tamanho para 500 KB e tente novamente.",
  "⛔ Erro ao gerar a figurinha. O arquivo está acima do limite de 500 KB. Reduza o tamanho para que funcione direitinho.",
  "❗ Atenção! O arquivo não está no tamanho certo. Reduza para 500 KB e tente novamente!",
  "🚀 Seu vídeo ou GIF está pesadinho! Reduza o tamanho para 500 KB e tente enviar de novo!",
  "⚡ Não conseguimos gerar a figurinha. O arquivo está grande demais! Reduza para 500 KB e tente novamente."
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
