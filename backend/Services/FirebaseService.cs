using Google.Cloud.Firestore;

namespace backend.Services;

public class FirebaseService
{
    private readonly FirestoreDb firestoreDb;
    protected readonly string projectId = "proyecto-web-grupo6";
    protected readonly string JSON_CREDENCIALES = "firebase-credentials.json";

    public FirebaseService()
    {
        var credentialPath = Path.Combine(AppContext.BaseDirectory, "Config", JSON_CREDENCIALES);

        Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialPath);

        firestoreDb = FirestoreDb.Create(projectId);
    }

    public CollectionReference GetCollection(string collectionName) =>
        firestoreDb.Collection(collectionName);
}
