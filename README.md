# Front End Omnichannel

Para rodar o app, tenha instalado o NodeJS em sua máquina.

Siga as instruções de cada diretório no README.

Será necessário criar um servidor de bot utilizando a plataforma de código aberto Botpress. [https://botpress.com/docs](https://botpress.com/docs). Após instalar, importe para o servidor o arquivo omnichannel.tgz, e altere o nó de chamada de API com nome de "api-signup" clicando em Edit Skill e mude a URL para o endereço do servidor do projeto. Depois altere o endereço do frontend no nó "success".

Depois vai para o item Code Editor no menu lateral, vá para o arquivo botpress.config.json na pasta Global, e habilite em enable abaixo da linha "location": "MODULES_ROOT/channel-telegram", depois vá para o arquivo channel-telegram.json na pasta Current Bot e insira o botToken de um bot do Telegram criado por você. Veja em [https://core.telegram.org/bots](https://core.telegram.org/bots).

Se preferir, pode testar os servidores de stagging.

Bot do Telegram: [https://t.me/bemo_test_bot](https://t.me/bemo_test_bot)
Servidor frontend: [https://omnichannel-app-front.herokuapp.com/](https://omnichannel-app-front.herokuapp.com/)
Servidor backend: [https://omnichannel-app-back.herokuapp.com/](https://omnichannel-app-back.herokuapp.com/)

Os diagramas com notação C4 estão na pasta docs.