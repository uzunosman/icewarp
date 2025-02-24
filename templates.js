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
            <domainstr>${CONFIG.DOMAIN}</domainstr>
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
        <commandname>getdomains</commandname>
        <commandparams>
            <listtype>0</listtype>
            <listparams>
                <domain>*</domain>
            </listparams>
        </commandparams>
    </query>
</iq>`,

    getServerInfo: (sessionId) => `<iq sid="${sessionId}">
    <query xmlns="admin:iq:rpc">
        <commandname>getserviceinfo</commandname>
        <commandparams>
            <info>
                <item>version</item>
                <item>build</item>
                <item>os</item>
                <item>platform</item>
                <item>installpath</item>
                <item>licenseid</item>
            </info>
        </commandparams>
    </query>
</iq>`,

    createUser: (sessionId, userData) => `<iq sid="${sessionId}">
    <query xmlns="admin:iq:rpc">
        <commandname>createobject</commandname>
        <commandparams>
            <account>
                <domain>${CONFIG.DOMAIN}</domain>
                <name>${userData.username}</name>
                <password>${userData.password}</password>
                <displayname>${userData.displayName}</displayname>
                <quota>${userData.quota || 1024}</quota>
                <type>0</type>
                <enabled>1</enabled>
                <services>
                    <service name="mail">1</service>
                    <service name="im">1</service>
                    <service name="groupware">1</service>
                    <service name="ftp">1</service>
                    <service name="sip">1</service>
                </services>
            </account>
        </commandparams>
    </query>
</iq>`,

    updateUser: (sessionId, userData) => `<iq sid="${sessionId}">
    <query xmlns="admin:iq:rpc">
        <commandname>modifyaccount</commandname>
        <commandparams>
            <email>${userData.email}</email>
            <displayname>${userData.displayName}</displayname>
            <pass>${userData.password}</pass>
            <quota>${userData.quota}</quota>
        </commandparams>
    </query>
</iq>`,

    deleteUser: (sessionId, email) => `<iq sid="${sessionId}">
    <query xmlns="admin:iq:rpc">
        <commandname>deleteaccount</commandname>
        <commandparams>
            <email>${email}</email>
        </commandparams>
    </query>
</iq>`
}; 