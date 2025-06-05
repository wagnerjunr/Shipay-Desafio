# 5 Questão - Back for Frontend (BFF)

## Conceito do BFF
**Back for Front-end (BFF)** é um padrão de arquitetura que atua como uma camada intermediária entre os clientes (front-end) e o back-end. Ele é responsável por fornecer APIs específicas para diferentes aplicações, conectando-as com os microsserviços.  
Os principais benefícios de um BFF incluem:  
- Redução do tráfego de dados.  
- Diminuição da latência.  
- Redução do processamento no cliente.  

Como dispositivos diferentes consomem dados de formas distintas, o BFF é essencial para tratar e entregar somente os dados necessários para cada dispositivo, otimizando o desempenho da aplicação.

---

## Design da Solução
**Implementação de Múltiplos BFFs:**  
Dada a existência de diferentes interfaces (Web, Mobile, Smart TV), a melhor abordagem é implementar múltiplos BFFs, um para cada interface,não havendo busca em excesso de dados desnecessários e com isso resultando na melhora do processamento e experiência do usuário final 
- Cada BFF pode ser configurado para atender às necessidades específicas de cada dispositivo.  
- Reduz a busca por dados desnecessários, melhorando o processamento e a experiência do usuário.  
- Por exemplo: enquanto a interface Web consome grandes volumes de dados, as Smart TVs demandam uma navegação mais simples e otimizada.  

**Diagrama de Conexão:**  
[Link para imagem do diagrama](https://github.com/wagnerjunr/Shipay-Desafio/blob/main/5Quest%C3%A3o/Diagrama.png)
<br>
[Link para o diagrama no Lucidchart](https://lucid.app/lucidchart/c4a3e44d-fccc-4e75-9238-03f37deba78a/edit?viewport_loc=-602%2C-107%2C4037%2C1978%2C.Q4MUjXso07N&invitationId=inv_cae643fa-1bd4-4ab6-8bee-9a1ad4c9c966) 

---

## Respostas

### a) Lógica para renderizar os botões e o layout da interface do usuário em cada dispositivo.  
**Resposta:** Cliente.  
O layout e os botões são específicos da plataforma, dependendo das interações com o usuário final. Estes são montados no cliente, baseando-se apenas nas requisições de exibição de dados.

---

### b) Lógica para agregar dados do MS de Catálogo e do MS de Usuários para montar a tela de "Recomendações Personalizadas" para a versão Web.  
**Resposta:** BFF Web.  
Por envolver a busca de diversos dados específicos (Catálogo + Usuários) para a interface Web, o BFF Web é ideal. Ele melhora a eficiência do processo e reduz a necessidade de tratamento de dados em excesso no front.

---

### c) Lógica para buscar uma lista simplificada de "Novos Lançamentos" para a aplicação Mobile.  
**Resposta:** BFF Mobile.  
Essa busca simplificada é mais eficiente quando tratada pelo BFF Mobile, aplicando filtros necessários e reduzindo a necessidade de processamento de dados em excesso no front.

---

### d) Lógica de negócio principal para registrar que um usuário assistiu a um vídeo.  
**Resposta:** Backend (microsserviços).  
Essa lógica é gerenciada no backend. Sempre que o usuário assiste a um vídeo, o dado é atualizado, garantindo a integridade da informação.

---

### e) Lógica para adaptar a qualidade do stream de vídeo com base na velocidade da conexão do usuário Mobile.  
**Resposta:** Backend (microsserviços).  
A adaptação da qualidade do vídeo depende do backend e dos microsserviços de streaming, sendo uma decisão em tempo real baseada na conexão do usuário.

---

### f) Validação de formato de e-mail no formulário de cadastro no cliente Web.  
**Resposta:** Cliente.  
A validação é realizada no cliente para fornecer uma resposta imediata ao usuário. (Também deve ser validada no backend por segurança).
