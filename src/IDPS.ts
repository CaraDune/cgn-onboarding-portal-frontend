const IDPS = {
  identityProviders: [
    {
      identifier: "Aruba",
      entityId: "arubaid",
      name: "Aruba.it ID",
      imageUrl: "https://assets.cdn.io.italia.it/spid/idps/spid-idp-arubaid.png"
    },
    {
      identifier: "Poste",
      entityId: "posteid",
      name: "Poste ID",
      imageUrl: "https://assets.cdn.io.italia.it/spid/idps/spid-idp-posteid.png"
    },
    {
      identifier: "Infocert",
      entityId: "infocertid",
      name: "Infocert ID",
      imageUrl:
        "https://assets.cdn.io.italia.it/spid/idps/spid-idp-infocertid.png"
    },
    {
      identifier: "Register",
      entityId: "spiditalia",
      name: "SpidItalia",
      imageUrl:
        "https://assets.cdn.io.italia.it/spid/idps/spid-idp-spiditalia.png"
    },
    {
      identifier: "IntesaID",
      entityId: "intesaid",
      name: "Intesa",
      imageUrl:
        "https://assets.cdn.io.italia.it/spid/idps/spid-idp-intesaid.png"
    },
    {
      identifier: "Sielte",
      entityId: "sielteid",
      name: "Sielte id",
      imageUrl:
        "https://assets.cdn.io.italia.it/spid/idps/spid-idp-sielteid.png"
    },
    {
      identifier: "Namirial",
      entityId: "namirialid",
      name: "Namirial ID",
      imageUrl:
        "https://assets.cdn.io.italia.it/spid/idps/spid-idp-namirialid.png"
    },
    {
      identifier: "Tim",
      entityId: "timid",
      name: "TIM id",
      imageUrl: "https://assets.cdn.io.italia.it/spid/idps/spid-idp-timid.png"
    }
  ],
  richiediSpid: "https://www.spid.gov.it/cos-e-spid/come-attivare-spid/"
};

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line functional/immutable-data
  IDPS.identityProviders.push({
    identifier: "test",
    entityId: "xx_testenv2",
    name: "test",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/11/Test-Logo.svg"
  });
}

export { IDPS };
