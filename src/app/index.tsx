import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React ,{useState}from "react";

import { Snackbar } from 'react-native-paper';
import Icons from '../components/Icons';


export default function Index() {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = (state: string[]) => {

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (state[a] !== "empty" && state[a] === state[b] && state[a] === state[c]) {
        setGameWinner(`${state[a]} won the game! 🥳`);
        return;
      }
    }

    if (!state.includes("empty")) {
      setGameWinner("Draw game... ⌛️");
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      setSnackbarMessage(gameWinner);
      setSnackbarVisible(true);
      return;
    }

    if (gameState[itemNumber] !== "empty") {
      setSnackbarMessage("Position is already filled");
      setSnackbarVisible(true);
      return;
    }
    const newGameState = [...gameState];
    newGameState[itemNumber] = isCross ? "cross" : "circle";
    setGameState(newGameState);

    checkIsWinner(newGameState);

    if (!gameWinner) {
      setIsCross(!isCross);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}
        >
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}

      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}
          >
            <Icons name={item} />
          </Pressable>
        )}
      />
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Reload the game'}
        </Text>
      </Pressable>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={{ backgroundColor: gameWinner ? '#000000' : 'red' }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
