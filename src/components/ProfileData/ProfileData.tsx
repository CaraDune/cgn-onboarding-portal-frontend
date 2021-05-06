import React, { useState, useEffect } from "react";
import { tryCatch } from "fp-ts/lib/TaskEither";
import { toError } from "fp-ts/lib/Either";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Api from "../../api/index";
import { RootState } from "../../store/store";
import { EDIT_OPERATOR_DATA } from "../../navigation/routes";
import ProfileDataItem from "./ProfileDataItem";

const ProfileData = () => {
  const [profile, setProfile] = useState<any>(null);
  const agreement = useSelector((state: RootState) => state.agreement.value);

  const getProfile = async (agreementId: string) =>
    await tryCatch(() => Api.Profile.getProfile(agreementId), toError)
      .map(response => response.data)
      .fold(
        () => void 0,
        newProfile => setProfile(newProfile)
      )
      .run();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    agreement && getProfile(agreement.id);
  }, []);

  return (
    <>
      {profile && (
        <section className="mt-2 px-8 py-10 bg-white">
          <section>
            <h2 className="h5 font-weight-bold text-dark-blue">
              Descrizione operatore
            </h2>
            <table className="table">
              <tbody>
                <ProfileDataItem
                  label="Nome operatore visualizzato"
                  value={profile.name}
                />
                <ProfileDataItem
                  label="Descrizione dell'operatore"
                  value={profile.description}
                />
                {profile.salesChannel.websiteUrl && (
                  <ProfileDataItem
                    label="Sito web"
                    value={profile.salesChannel.websiteUrl}
                  />
                )}
                <ProfileDataItem
                  label="Indirizzo"
                  value={profile.legalOffice}
                />
                <ProfileDataItem label="Immagine operatore" />
              </tbody>
            </table>
            <Link
              className="mt-8 btn btn-outline-primary"
              to={EDIT_OPERATOR_DATA}
            >
              Modifica dati
            </Link>
          </section>
        </section>
      )}
    </>
  );
};

export default ProfileData;
