from joblib import load

clf = load('clf.joblib') 
tf_vectorizer = load("tf.joblib")

def make_prediction (user_input):
    x = [user_input]
    tf = tf_vectorizer.transform(x)
    decade = clf.predict(tf)

    return(decade)

z = "In the commencement of a revolution which received its birth from the usurpations of tyranny, nothing was more natural than that the public mind should be influenced by an extreme spirit of jealousy. To resist these encroachments and to nourish this spirit was the great object of all our public and private institutions. The zeal for liberty became predominant and excessive. In forming our Confederation this passion alone seemed to actuate us, and we appear to have had no other view than to secure ourselves from despotism. The object certainly was a valuable one, and deserved our utmost attention. But, sir, there is another object equally important and which our enthusiasm rendered us little capable of regarding; I mean a principle of strength and stability in the organization of our government, and vigor in its operations. This purpose can never be accomplished but by the establishment of some select body formed peculiarly upon this principle. There are few positions more demonstrable than that there should be in every republic some permanent body to correct the prejudices, check the intemperate passions, and regulate the fluctuations of a popular assembly. It is evident that a body instituted for these purposes must be so formed as to exclude as much as possible from its own character those infirmities and that mutability which it is designed to remedy. It is therefore necessary that it should be small, that it should hold its authority during a considerable period, and that it should have such an independence in the exercise of its powers as will divest it as much as possible of local prejudices. It should be so formed as to be the center of political knowledge, to pursue always a steady line of conduct, and to reduce every irregular propensity to system. Without this establishment we may make experiments without end, but shall never have an efficient government."

print(make_prediction(z))