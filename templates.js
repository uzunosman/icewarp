const XML_TEMPLATES = {
    authenticate: `<iq>
    <query xmlns="admin:iq:rpc">
        <commandname>authenticate</commandname>
        <commandparams>
            <authtype>0</authtype>
            <email>api_admin@api.test</email>
            <password>cjcap3</password>
            <digest></digest>
            <persistentlogin>0</persistentlogin>
            <appversion>23.0.1</appversion>
            <platform>windows</platform>
        </commandparams>
    </query>
</iq>`,

    getUsers: (sessionId) => `<iq sid="${sessionId}">
    <query xmlns="admin:iq:rpc">
        <commandname>getaccountsinfolist</commandname>
        <commandparams>
            <domainstr>api.test</domainstr>
            <filter>
                <namemask>*</namemask>
                <typemask>*</typemask>
            </filter>
            <offset>0</offset>
            <count>100</count>
        </commandparams>
    </query>
</iq>`,

    getDomains: (sessionId) => `<iq sid="${sessionId}">
    <query xmlns="admin:iq:rpc">
        <commandname>getdomainlist</commandname>
        <commandparams/>
    </query>
</iq>`,

    getServerInfo: (sessionId) => `<iq sid="${sessionId}">
    <query xmlns="admin:iq:rpc">
        <commandname>getserverinfo</commandname>
        <commandparams/>
    </query>
</iq>`,

    createUser: (sessionId) => `<iq sid="${sessionId}">
    <query xmlns="admin:iq:rpc">
        <commandname>createaccount</commandname>
        <commandparams>
            <domainname>api.test</domainname>
            <username>yeni.kullanici</username>
            <pass>Sifre123!</pass>
            <displayname>Yeni Kullanıcı</displayname>
            <quota>1024</quota>
            <type>0</type>
            <enabled>1</enabled>
            <services>
                <service name="mail">1</service>
                <service name="im">1</service>
                <service name="groupware">1</service>
                <service name="ftp">1</service>
                <service name="sip">1</service>
            </services>
        </commandparams>
    </query>
</iq>`
}; 