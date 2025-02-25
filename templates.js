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
        <commandname>getdomainsinfolist</commandname>
        <commandparams>
            <filter>
                <namemask>*</namemask>
                <typemask>*</typemask>
            </filter>
            <offset>0</offset>
            <count>100</count>
        </commandparams>
    </query>
</iq>`,

    getServerInfo: (sessionId) => `<iq sid="${sessionId}">
    <query xmlns="admin:iq:rpc">
        <commandname>getservicesinfolist</commandname>
        <commandparams>
            <filter>
                <mask>*</mask>
            </filter>
            <offset>0</offset>
            <count>100</count>
        </commandparams>
    </query>
</iq>`,

    createUser: (sessionId, domain, userData) => `<iq sid="${sessionId}">
    <query xmlns="admin:iq:rpc">
        <commandname>createaccount</commandname>
        <commandparams>
            <domainstr>${domain}</domainstr>
            <accountproperties>
                <item>
                    <apiproperty>
                        <propname>u_name</propname>
                    </apiproperty>
                    <propertyval>
                        <classname>tpropertystring</classname>
                        <val>${userData.username}</val>
                    </propertyval>
                    <propertyright>full</propertyright>
                </item>
                <item>
                    <apiproperty>
                        <propname>u_displayname</propname>
                    </apiproperty>
                    <propertyval>
                        <classname>tpropertystring</classname>
                        <val>${userData.displayName}</val>
                    </propertyval>
                    <propertyright>full</propertyright>
                </item>
                <item>
                    <apiproperty>
                        <propname>u_password</propname>
                    </apiproperty>
                    <propertyval>
                        <classname>tpropertystring</classname>
                        <val>${userData.password}</val>
                    </propertyval>
                    <propertyright>full</propertyright>
                </item>
                <item>
                    <apiproperty>
                        <propname>u_email</propname>
                    </apiproperty>
                    <propertyval>
                        <classname>tpropertystring</classname>
                        <val>${userData.username}@${domain}</val>
                    </propertyval>
                    <propertyright>full</propertyright>
                </item>
                <item>
                    <apiproperty>
                        <propname>u_fullname</propname>
                    </apiproperty>
                    <propertyval>
                        <classname>tpropertystring</classname>
                        <val>${userData.displayName}</val>
                    </propertyval>
                    <propertyright>full</propertyright>
                </item>
                <item>
                    <apiproperty>
                        <propname>u_type</propname>
                    </apiproperty>
                    <propertyval>
                        <classname>tpropertystring</classname>
                        <val>${userData.accountType === '1' ? 'admin' : 'user'}</val>
                    </propertyval>
                    <propertyright>full</propertyright>
                </item>
                <item>
                    <apiproperty>
                        <propname>u_mailbox</propname>
                    </apiproperty>
                    <propertyval>
                        <classname>tpropertystring</classname>
                        <val>1</val>
                    </propertyval>
                    <propertyright>full</propertyright>
                </item>
                <item>
                    <apiproperty>
                        <propname>u_mailboxquota</propname>
                    </apiproperty>
                    <propertyval>
                        <classname>tpropertystring</classname>
                        <val>${userData.quota}</val>
                    </propertyval>
                    <propertyright>full</propertyright>
                </item>
                <item>
                    <apiproperty>
                        <propname>u_enabled</propname>
                    </apiproperty>
                    <propertyval>
                        <classname>tpropertystring</classname>
                        <val>${userData.accountState === '1' ? '0' : '1'}</val>
                    </propertyval>
                    <propertyright>full</propertyright>
                </item>
                ${userData.services ? `
                <item>
                    <apiproperty>
                        <propname>u_services</propname>
                    </apiproperty>
                    <propertyval>
                        <classname>tpropertystringlist</classname>
                        <val>${Object.entries(userData.services)
                            .filter(([_, value]) => value)
                            .map(([service, value]) => `<item>${service}=${value}</item>`)
                            .join('')}</val>
                    </propertyval>
                    <propertyright>full</propertyright>
                </item>
                ` : ""}
            </accountproperties>
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
        <commandname>deleteaccounts</commandname>
        <commandparams>
            <domainstr>${email.split('@')[1]}</domainstr>
            <accountlist>
                <classname>tpropertystringlist</classname>
                <val>
                    <item>${email}</item>
                </val>
            </accountlist>
            <leavedata>0</leavedata>
        </commandparams>
    </query>
</iq>`
};