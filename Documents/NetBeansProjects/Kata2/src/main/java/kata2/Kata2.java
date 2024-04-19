/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Project/Maven2/JavaApp/src/main/java/${packagePath}/${mainClassName}.java to edit this template
 */

package kata2;

import java.util.HashMap;
import java.util.Map;


public class Kata2 {

    public static void main(String[] args) {
        int[] data = {1,2,3,3,2,3,5,4,6,6,7,3,8,-4,5};
        Map<Integer, Integer> histogram = new HashMap<Integer, Integer>();
        for (int i = 0; i < data.length; i++) {
            if(histogram.containsKey(data[i])) {
                histogram.put(data[i],histogram.get(data[i])+1);
            } else {
                histogram.put(data[i], 1);
            }
        }
        for (Integer key : histogram.keySet()) {
            System.out.println(key + "==>"+ histogram.get(key));
        }
    }
}
