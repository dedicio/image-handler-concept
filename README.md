# Image Handler Concept

Este é um estudo sobre como enviar e processar imagens para um bucket S3 através de uma Lambda function.

Há três serviços diferentes para comparação, usando as stacks:
- [Bun](https://bun.sh/)[^1]
- [Node.js](https://nodejs.org/en) + [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/en) + [Fastify](https://fastify.dev/)

O objetivo final é montar todos da mesma forma e testar qual tem a melhor performance.



## Como rodar o projeto

Você vai precisar ter o [Docker](https://docs.docker.com/engine/install/) instalado para rodar os projetos. Também é possível rodar um a um localmente na máquina, mas não é recomendado.

Para rodar os testes de performance, é necessário ter o [Grafana K6](https://grafana.com/docs/k6/latest/set-up/install-k6/) instalado.

Antes de começar, faça uma cópia dos arquivos `*.env.example` para arquivos `*.env`

```bash
make setup
```

_No arquivo localstack.env, você precisa criar um [Auth Token](https://app.localstack.cloud/workspace/auth-token) na Localstack e colocar na variável `LOCALSTACK_AUTH_TOKEN`_

Depois suba todos os serviços:

```bash
make start
```

Para rodar os testes de performance:

```bash
make test
```

Para reiniciar os serviços:
```bash
make restart
```

Para parar todos os serviços

```bash
make stop
```


[^1]: Por problemas no uso do SDK da AWS no Bun, não foi possível rodar ele em container.