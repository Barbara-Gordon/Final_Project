#nltk – natural language processing library. Note: After installing nltk with “pip install nltk” run the following two commands in the command window to download the data that is needed in order for nltk to work:
#python
#import nltk
#nltk.download()


import nltk as nk
import pickle as pk
import re
import time
from nltk.corpus import words
from nltk.corpus import wordnet
import string
from nltk.corpus import stopwords
from bs4 import BeautifulSoup as bs
import os
global Nltklemmatizer
global PortStemmer
global stopwordset

stopwordset = set(stopwords.words('english'))
Nltklemmatizer = nk.stem.WordNetLemmatizer()
PortStemmer = nk.stem.porter.PorterStemmer()


#tokenize using nltk library
def basicNltkTokenization(input):
    tokens = nk.word_tokenize(input)
    return tokens

#basic Nltk porter stemmer
def basicNltkPorterStemmer(input):
    global PortStemmer
    result = PortStemmer.stem(input)
    return result

#wordnet POS Tag Converters
def getBasicPos(tag):
    if(tag in ['NN', 'NNS', 'NNP', 'NNPS']):
        return 'n'
    elif(tag in ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']):
        return 'v'
    elif(tag in ['RB', 'RBR', 'RBS']):
        return 'r'
    elif(tag in ['JJ', 'JJR', 'JJS']):
        return 'a'
    else:
        return 'u'

#Nltk tokenization, postags, lemmatization
def basicNltkTokenizeAll(input):
    postags = basicNltkPosTagger(input)
    tokens = []
    lemmas = []
    postagsO = []
    for j in range(0, len(postags),1):
        lemmas.append(basicNltkWordNetLemmatizer(postags[j][0],getBasicPos(postags[j][1])))
        tokens.append(postags[j][0])
        postagsO.append(postags[j][1])
    return tokens, postagsO, lemmas

#get results for each sentences

def basicNltkTokenizerQuick(input):
    tokensO =[]
    lemmasO = []
    sentences = basicNltkSentenceTokenizer(input)
    for j in range(0, len(sentences), 1):
        tokens, postags, lemmas = basicNltkTokenizeAll(sentences[j])
        tokensO.append(tokens)
        lemmasO.append(lemmas)
    return tokensO, lemmasO

def basicNltkSpacyProcessAllSentences(input):
    sentences = basicNltkSentenceTokenizer(input)
    resPsent = []
    for j in range(0, len(sentences),1):
        sptokens = []
        sppostags = []
        splemmas = []
        tokens, postags, lemmas = basicNltkTokenizeAll(sentences[j])
        tknouns = basicNltkNounChunks(sentences[j])
        tkentities = basicNltkNER(sentences[j])
        #postags = []
        #bigrams = []
        #lemmas = []
        #tknouns = []
        #tkentities = []
        #tokens, sppostags, splemmas, spner, spnerlabs, spnounchunks = basicSpacyChunksAndEntitiesTokens(sentences[j])
        tbnouns = basicTextblobNounChunks(sentences[j])
        nm = []
        for tke in tokens:
            nm.append(tke.lower())

        ngrams = computeNltkNgramsTokens(nm, dict(), 1, 2)

        if ("2" in ngrams):
            bigrams = ngrams["2"]
        tokens = perTokenCleanup(tokens,1)
        splemmas = perTokenCleanup(lemmas,1)
        spner = perTokenCleanup(tkentities,1)
        spnounchunks = perTokenCleanup(tknouns)
        bigrams = perTokenCleanup(bigrams)
        tbnouns = perTokenCleanup(tbnouns,1)

        resPsent.append((tokens, postags, lemmas, splemmas, bigrams, tbnouns,tknouns, tkentities, spner, spnounchunks))

    #tokens, postags, lemmas, bigrams, tbnouns, tknouns, tkentities, sner, spnounchunks
    return resPsent

#basic Nltk lemmatizer
def basicNltkWordNetLemmatizer(input,category = 'n'):
    #Wordnet post Syntactic categories: n for noun files, v for verb files, a for adjective files, r for adverb files.
    global Nltklemmatizer
    result = input
    if(category == 'n' or category == 'v' or category == 'a' or category == 'r'):
        result = Nltklemmatizer.lemmatize(input,category)
    return result

#basic Nltk Pos tagger - refer to link for interpretation of pos tags: http://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html
def basicNltkPosTagger(input):
    tokens = basicNltkTokenization(input)
    postags = nk.pos_tag(tokens)
    return postags

#Nltk N gram computation: best to not go above maxn = 2
def computeNltkNgrams(input,Ngramsdict = dict(), currn = 1, maxn = 1):
    global stopwordset
    unigrams = []
    if(currn ==1):
        unigrams =  basicNltkTokenization(input)
        Ngramsdict[str(currn)] = unigrams
    if (currn==maxn):
        return (Ngramsdict)
    else:
        unigrams = Ngramsdict['1']
        ngram =Ngramsdict[str(currn)]
        newgram = []
        for c in range(0,len(unigrams)-currn,1):
            if (ngram[c] not in stopwordset and unigrams[c + currn] not in stopwordset):
                newgram.append(ngram[c] + " " + unigrams[c + currn])
        currn = currn + 1
        Ngramsdict[str(currn)] = newgram
        return computeNltkNgrams(input,Ngramsdict,currn,maxn)

def computeNltkNgramsTokens(unigrams, Ngramsdict=dict(), currn=1, maxn=1):
    global stopwordset

    if (currn == 1):
        Ngramsdict[str(currn)] = unigrams

    if (currn == maxn):
        return (Ngramsdict)
    else:
        ngram = Ngramsdict[str(currn)]
        newgram = []
        for c in range(0, len(unigrams) - currn, 1):
            if(unigrams[c + currn] not in stopwordset):
                newgram.append(ngram[c] + " " + unigrams[c + currn])
        currn = currn + 1
        Ngramsdict[str(currn)] = newgram
        return computeNltkNgrams(unigrams, Ngramsdict, currn, maxn)

#sentence tokenizer
def basicNltkSentenceTokenizer(beginer):

    result = nk.tokenize.sent_tokenize(beginer)
    return result

#stopword removal
def stopWordRemoval(input):
    global stopwordset
    result = []
    for j in range(0, len(input),1):
        if(input[j] not in stopwordset):
            result.append(input[j])




#nltk ner helper function
def extract_entity_names(t):
    entity_names = []

    if hasattr(t, 'label') and t.label:
        if t.label() == 'NE':
            entity_names.append(' '.join([child[0] for child in t]))
        else:
            for child in t:
                entity_names.extend(extract_entity_names(child))

    return entity_names

#named entity recognition - nltk
def basicNltkNER(input):
    sentences = nk.sent_tokenize(input)
    tokenized_sentences = [nk.word_tokenize(sentence) for sentence in sentences]
    tagged_sentences = [nk.pos_tag(sentence) for sentence in tokenized_sentences]
    chunked_sentences = nk.ne_chunk_sents(tagged_sentences, binary=True)

    entity_names = []
    for tree in chunked_sentences:
        # Print results per sentence
        # print extract_entity_names(tree)

        entity_names.extend(extract_entity_names(tree))

    # Print all entity names
    # print entity_names

    # Print unique entity names
    return entity_names


#nltk noun chunk helper
def extract_np(psent):
	for subtree in psent.subtrees():
		if subtree.label() == 'NP':
			yield ' '.join(word for word, tag in subtree.leaves())

#noun chunks - nltk
def basicNltkNounChunks(input):
    tagged_sent =  basicNltkPosTagger(input)
    grammar = r"""
          NP: {<DT|PP\$>?<JJ>*<NN>}   # chunk determiner/possessive, adjectives and noun
          {<NNP>+}                # chunk sequences of proper nouns
          {<NN>+}                 # chunk consecutive nouns
          """
    cp = nk.RegexpParser(grammar)
    parsed_sent = cp.parse(tagged_sent)
    results = []
    for npstr in extract_np(parsed_sent):
        results.append(npstr)
    return results


def processReutersData():
    from bs4 import BeautifulSoup as bs

    directory = "reuters_data"
    data = []
    for j in range(0,22,1):
        lst = ""
        if(j<10):
            lst = "00" + str(j)
        else:
            lst = "0" + str(j)
        fname = "reut2-" + lst + ".sgm"
        filepath = os.path.join(directory,fname)
        print(filepath)
        with open(filepath) as file:
            html = file.read()
        soup = bs(html, 'html.parser')
        texts = soup.find_all('text')

        print(len(texts))

        for texter in texts:
            ldt = dict()
            try:
                ldt["body"] = texter.body.text
            except:
                la = 1
            try:
                ldt["title"] = texter.title.text
            except:
                la = 1
            try:
                ldt["dateline"] = texter.dateline.text
            except:
                la = 1
            
            data.append(ldt)
        
    return data

def processReutersDataTitleBody():
    from bs4 import BeautifulSoup as bs

    directory = "reuters_data"
    data = []
    for j in range(0,22,1):
        lst = ""
        if(j<10):
            lst = "00" + str(j)
        else:
            lst = "0" + str(j)
        fname = "reut2-" + lst + ".sgm"
        filepath = os.path.join(directory,fname)
        print(filepath)
        with open(filepath) as file:
            html = file.read()
        soup = bs(html, 'html.parser')
        texts = soup.find_all('text')

        print(len(texts))

        for texter in texts:
            outter = ""
            try:
                if(outter == ""):
                    outter = texter.body.text
                else:
                    outter = outter + " " + texter.body.text
    
            except:
                la = 1
            try:
                if(outter == ""):
                    outter = texter.title.text
                else:
                    outter = outter + " " + texter.title.text
            except:
                la = 1

            
            data.append(outter)
        
    return data


def processReutersDataTokenization():
    from bs4 import BeautifulSoup as bs

    directory = "reuters_data"
    data = []
    for j in range(0,22,1):
        lst = ""
        if(j<10):
            lst = "00" + str(j)
        else:
            lst = "0" + str(j)
        fname = "reut2-" + lst + ".sgm"
        filepath = os.path.join(directory,fname)
        print(filepath)
        with open(filepath) as file:
            html = file.read()
        soup = bs(html, 'html.parser')
        texts = soup.find_all('text')

        print(len(texts))

        for texter in texts:
            outter = ""
            try:
                if(outter == ""):
                    outter = texter.body.text
                else:
                    outter = outter + " " + texter.body.text
    
            except:
                la = 1
            try:
                if(outter == ""):
                    outter = texter.title.text
                else:
                    outter = outter + " " + texter.title.text
            except:
                la = 1

            sentences = basicNltkSentenceTokenizer(outter)
            if(sentences is not None):
                for se in sentences:
                    tokens, postagsO, lemmas = basicNltkTokenizeAll(se)
                    tokens.extend(lemmas)
                    data.append(list(set(tokens)))
        
    return data
if __name__ == "__main__":
    print("main method")
