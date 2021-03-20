FROM oraclelinux:7-slim
RUN yum -y install oracle-release-el7 oracle-nodejs-release-el7 &&
     yum-config-manager --disable ol7_developer_EPEL &&
     yum -y install oracle-instantclient19.3-basiclite nodejs &&
     rm -rf /var/cache/yum
RUN npm -g install pm2 yarn

WORKDIR /server
COPY src/package*.json ./
RUN yarn install
COPY src/ /server
EXPOSE 3000
CMD ["pm2-runtime", "ecosystem.config.js"]
